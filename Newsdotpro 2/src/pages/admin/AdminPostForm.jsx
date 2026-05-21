import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { addArticle, updateArticle, getArticleById } from '../../data/articles';
import { useAuth } from '../../context/AuthContext';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';
import './AdminPostForm.css';

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=900&q=80';
const CATEGORIES = ['news','politics','business','tech','society','investigations','opinion'];
const TAGS = ['Abuja','Nigeria','Africa','Global','Politics','Business','Tech'];

// ─── Timeout Helper ───────────────────────────────────────────────────────────
// Races a promise against a timeout so Firebase Storage can't hang forever.
function withTimeout(promise, ms, label = 'Operation') {
    return Promise.race([
        promise,
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error(`${label} timed out after ${ms / 1000}s`)), ms)
        ),
    ]);
}

// ─── Image Compression Helper ──────────────────────────────────────────────────
// Resizes to max 1200 px wide and compresses to JPEG at 70% quality.
// Output is always a compact data URL (≈80–150 KB) that Firestore can store
// and every browser can render — no blob: URLs ever reach Firestore.
function compressImage(file, maxWidth = 1200, quality = 0.7) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = () => reject(new Error('Failed to read image file.'));
        reader.onload = (e) => {
            const img = new Image();
            img.onerror = () => reject(new Error('Failed to decode image.'));
            img.onload = () => {
                const scale  = img.width > maxWidth ? maxWidth / img.width : 1;
                const canvas = document.createElement('canvas');
                canvas.width  = Math.round(img.width  * scale);
                canvas.height = Math.round(img.height * scale);
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                resolve(canvas.toDataURL('image/jpeg', quality));
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });
}

const formatDate = (d) =>
    d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

export default function AdminPostForm() {
    const navigate   = useNavigate();
    const { id }     = useParams();
    const { user }   = useAuth();
    const isEditMode = Boolean(id);

    const [title, setTitle]           = useState('');
    const [category, setCategory]     = useState('news');
    const [tag, setTag]               = useState('Nigeria');
    const [excerpt, setExcerpt]       = useState('');
    const [body, setBody]             = useState('');
    const [imageUrl, setImageUrl]     = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [status, setStatus]         = useState('published');
    const [loadingArticle, setLoadingArticle] = useState(isEditMode);
    const [isSubmitting, setIsSubmitting]     = useState(false);
    const [error, setError]           = useState('');
    const [success, setSuccess]       = useState('');
    const [uploadProgress, setUploadProgress] = useState('');
    const fileInputRef                = useRef(null);

    useEffect(() => {
        if (!isEditMode) return;
        (async () => {
            try {
                const article = await getArticleById(id);
                if (!article) { setError('Article not found.'); return; }
                setTitle(article.title || '');
                setCategory(article.category || 'news');
                setTag(article.tag || 'Nigeria');
                setExcerpt(article.excerpt || '');
                setBody(article.body || '');
                setImageUrl(article.image || '');
                setImagePreview(article.image || '');
                setStatus(article.status || 'published');
            } catch (err) {
                setError('Failed to load article: ' + err.message);
            } finally {
                setLoadingArticle(false);
            }
        })();
    }, [id, isEditMode]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) { setError('Please select a valid image file.'); return; }
        if (file.size > 10 * 1024 * 1024) { setError('Image must be under 10 MB.'); return; }
        // Show a local preview immediately (blob URL is fine for preview-only)
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
        setImageUrl(''); // clear stored URL — real URL comes after compression on submit
        setSelectedFile(file);
        setError('');
    };

    const handleUrlChange = (e) => {
        const val = e.target.value;
        setImageUrl(val);
        setImagePreview(val);
        setSelectedFile(null);
    };

    const clearImage = () => {
        setImageUrl('');
        setImagePreview('');
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); setSuccess(''); setUploadProgress('');
        if (!title.trim() || !category || !excerpt.trim() || !body.trim()) {
            setError('Please fill in all required fields: Headline, Excerpt, and Article Body.');
            return;
        }
        setIsSubmitting(true);

        try {
            let finalImageUrl = imageUrl.trim() || DEFAULT_IMAGE;

            if (selectedFile) {
                // Step 1 — try Firebase Storage (fast CDN delivery), with 15s timeout
                let usedStorage = false;
                try {
                    setUploadProgress('Uploading image…');
                    const storageRef = ref(storage, `article-images/${Date.now()}_${selectedFile.name}`);
                    const snapshot   = await withTimeout(
                        uploadBytes(storageRef, selectedFile),
                        15000,
                        'Firebase Storage upload'
                    );
                    finalImageUrl    = await withTimeout(
                        getDownloadURL(snapshot.ref),
                        10000,
                        'Firebase Storage getDownloadURL'
                    );
                    usedStorage      = true;
                    console.log('[NEWSDoT] Image uploaded to Firebase Storage:', finalImageUrl);
                } catch (storageErr) {
                    console.warn('[NEWSDoT] Firebase Storage unavailable — compressing & embedding image:', storageErr.code || storageErr.message);
                }

                // Step 2 — fallback: compress client-side and embed as data URL
                if (!usedStorage) {
                    setUploadProgress('Compressing image…');
                    try {
                        finalImageUrl = await compressImage(selectedFile);
                        console.log('[NEWSDoT] Image compressed to', Math.round(finalImageUrl.length / 1024), 'KB');
                    } catch (compressErr) {
                        console.error('[NEWSDoT] Compression failed:', compressErr);
                        // Last resort: use default image rather than crashing
                        finalImageUrl = DEFAULT_IMAGE;
                    }
                }
            } else if (!finalImageUrl || finalImageUrl.startsWith('blob:')) {
                // Safety net: blob URLs must never reach Firestore
                finalImageUrl = DEFAULT_IMAGE;
            }

            setUploadProgress('Saving article…');

            const payload = {
                title:    title.trim(),
                category,
                tag,
                tagSlug:  tag.toLowerCase(),
                excerpt:  excerpt.trim(),
                body:     body.trim(),
                author:   user?.username?.split('@')[0] || user?.name || 'Admin',
                image:    finalImageUrl,
                readTime: `${Math.max(1, Math.ceil(body.trim().split(/\s+/).length / 200))} min read`,
                status,
                date:     formatDate(new Date()),
            };

            if (isEditMode) {
                await updateArticle(id, payload);
                setSuccess('Article updated successfully!');
            } else {
                await addArticle(payload);
                setSuccess('Article published successfully!');
            }

            setUploadProgress('');
            setTimeout(() => navigate('/admin/posts'), 1200);
        } catch (err) {
            console.error('[NEWSDoT] Submit error:', err);
            setUploadProgress('');
            // Give a user-friendly message for common Firestore errors
            if (err.code === 'permission-denied' || err.code === 'PERMISSION_DENIED') {
                setError('Permission denied. Please make sure you are logged in as an admin and Firestore rules allow writes.');
            } else if (err.message?.includes('Document too large')) {
                setError('The image is too large to save. Please use a smaller image (under 1 MB) or an external URL.');
            } else {
                setError(err.message || 'Something went wrong. Please try again.');
            }
            setIsSubmitting(false);
        }
    };

    const wordCount = body.trim() ? body.trim().split(/\s+/).length : 0;
    const readTime  = Math.max(1, Math.ceil(wordCount / 200));

    // Safe imageUrl value: never pass blob: or null to the URL input field
    const safeImageUrlValue = (imageUrl && !imageUrl.startsWith('blob:') && !imageUrl.startsWith('data:'))
        ? imageUrl
        : '';

    if (loadingArticle) {
        return (
            <div className="admin-page" style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'60vh' }}>
                <div style={{ textAlign:'center', color:'var(--admin-text-muted)' }}>
                    <p>Loading article…</p>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-page">
            <div className="admin-page-header">
                <div className="admin-header-left">
                    <Link to="/admin/posts" className="admin-back-link">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                        Back to Posts
                    </Link>
                    <h1 className="admin-page-title">{isEditMode ? 'Edit Article' : 'New Article'}</h1>
                </div>
                <div className="admin-form-meta-pills">
                    <span className="admin-meta-pill">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>
                        {wordCount} words
                    </span>
                    <span className="admin-meta-pill">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        ~{readTime} min read
                    </span>
                </div>
            </div>

            <div className="admin-form-layout">
                <div className="admin-form-main">
                    {error && (
                        <div className="admin-alert admin-alert-error">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="admin-alert admin-alert-success">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                            {success}
                        </div>
                    )}
                    {uploadProgress && (
                        <div className="admin-alert" style={{ background: 'rgba(var(--admin-accent-rgb, 99,102,241),0.12)', borderColor: 'var(--admin-accent, #6366f1)', color: 'var(--admin-accent, #6366f1)' }}>
                            <span className="admin-btn-spinner" style={{ marginRight: '8px', display: 'inline-block' }} />
                            {uploadProgress}
                        </div>
                    )}

                    <form id="article-form" className="admin-post-form" onSubmit={handleSubmit} noValidate>
                        <div className="admin-form-group">
                            <label htmlFor="title">Headline <span className="required">*</span></label>
                            <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter a compelling headline…" required className="admin-title-input" />
                        </div>

                        <div className="admin-form-group">
                            <label htmlFor="excerpt">Excerpt <span className="required">*</span></label>
                            <textarea id="excerpt" value={excerpt} onChange={e => setExcerpt(e.target.value)} rows="3" placeholder="A concise, compelling summary…" required />
                            <small>{excerpt.length} / 280 characters</small>
                        </div>

                        <div className="admin-form-group">
                            <label>Cover Image</label>
                            <div
                                className="admin-image-upload-zone"
                                onClick={() => fileInputRef.current?.click()}
                                onDragOver={e => e.preventDefault()}
                                onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleFileChange({ target: { files: [f] } }); }}
                            >
                                {imagePreview ? (
                                    <div className="admin-image-preview">
                                        <img src={imagePreview} alt="Cover preview" onError={() => setImagePreview('')} />
                                        <button type="button" className="admin-image-clear" onClick={ev => { ev.stopPropagation(); clearImage(); }}>
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                        </button>
                                        {selectedFile && (
                                            <span style={{ position:'absolute', bottom:'8px', left:'8px', background:'rgba(0,0,0,0.65)', color:'#fff', fontSize:'11px', padding:'3px 8px', borderRadius:'4px' }}>
                                                Will be compressed on publish
                                            </span>
                                        )}
                                    </div>
                                ) : (
                                    <div className="admin-image-placeholder">
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                                        <p><strong>Click to upload</strong> or drag &amp; drop</p>
                                        <span>JPEG, PNG, WebP — max 10 MB (auto-compressed)</span>
                                    </div>
                                )}
                                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="admin-file-input-hidden" />
                            </div>
                            <div className="admin-image-url-row">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                                <input
                                    type="url"
                                    value={safeImageUrlValue}
                                    onChange={handleUrlChange}
                                    placeholder="Or paste an image URL (https://…)"
                                />
                            </div>
                        </div>

                        <div className="admin-form-group">
                            <label htmlFor="body">Article Body <span className="required">*</span></label>
                            <div className="admin-body-toolbar">
                                {['B','I','"','¶'].map(t => <button key={t} type="button" className="admin-body-tool">{t}</button>)}
                            </div>
                            <textarea id="body" value={body} onChange={e => setBody(e.target.value)} rows="18" placeholder="Write the full article content here…" required />
                        </div>
                    </form>
                </div>

                <div className="admin-form-sidebar">
                    <div className="admin-sidebar-card">
                        <h3 className="admin-sidebar-card__title">Publish</h3>
                        <div className="admin-form-group">
                            <label htmlFor="status">Status</label>
                            <select id="status" value={status} onChange={e => setStatus(e.target.value)} className="admin-select">
                                <option value="published">● Published</option>
                                <option value="draft">○ Draft</option>
                            </select>
                        </div>
                        <button type="submit" form="article-form" className="admin-btn admin-btn-primary admin-publish-btn" disabled={isSubmitting}>
                            {isSubmitting ? <span className="admin-btn-spinner" /> : (
                                <><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 2 11 13"/><path d="m22 2-7 20-4-9-9-4Z"/></svg>{isEditMode ? 'Update Article' : 'Publish Article'}</>
                            )}
                        </button>
                        <Link to="/admin/posts" className="admin-btn admin-btn-secondary admin-cancel-btn">Cancel</Link>
                    </div>

                    <div className="admin-sidebar-card">
                        <h3 className="admin-sidebar-card__title">Categorisation</h3>
                        <div className="admin-form-group">
                            <label htmlFor="category">Category <span className="required">*</span></label>
                            <select id="category" value={category} onChange={e => setCategory(e.target.value)} className="admin-select" required>
                                {CATEGORIES.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                            </select>
                        </div>
                        <div className="admin-form-group">
                            <label htmlFor="tag">Region / Tag</label>
                            <select id="tag" value={tag} onChange={e => setTag(e.target.value)} className="admin-select">
                                {TAGS.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="admin-sidebar-card">
                        <h3 className="admin-sidebar-card__title">Article Stats</h3>
                        <div className="admin-stats-mini">
                            <div className="admin-stats-mini__item"><span>Words</span><strong>{wordCount}</strong></div>
                            <div className="admin-stats-mini__item"><span>Read time</span><strong>{readTime} min</strong></div>
                            <div className="admin-stats-mini__item"><span>Category</span><strong className={`admin-badge-cat admin-category-${category}`}>{category}</strong></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
