
import React, { useState } from 'react';
import { Stats, UpdatePost, Language } from '../types';

interface AdminPanelProps {
  lang: Language;
  stats: Stats;
  updates: UpdatePost[];
  onUpdateStats: (newStats: Partial<Stats>) => void;
  onAddUpdate: (post: UpdatePost) => void;
  onDeleteUpdate: (id: string) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ lang, stats, updates, onUpdateStats, onAddUpdate, onDeleteUpdate }) => {
  const [pass, setPass] = useState('');
  const [isAuthed, setIsAuthed] = useState(false);
  
  const [formData, setFormData] = useState({
    raised: stats.totalRaised,
    donors: stats.totalDonors,
    families: stats.familiesSupported,
    ramadanDate: stats.ramadanStartDate.split('T')[0]
  });

  const [postForm, setPostForm] = useState({
    title: '',
    content: '',
    imageUrl: ''
  });

  const handleLogin = () => {
    if (pass === 'ramadan2025') setIsAuthed(true);
    else alert(lang === 'ar' ? 'كلمة المرور خاطئة' : 'Invalid Password');
  };

  const saveStats = () => {
    onUpdateStats({
      totalRaised: Number(formData.raised),
      totalDonors: Number(formData.donors),
      familiesSupported: Number(formData.families),
      ramadanStartDate: new Date(formData.ramadanDate).toISOString()
    });
    alert(lang === 'ar' ? 'تم تحديث الإحصائيات بنجاح' : 'Stats updated successfully');
  };

  const publishPost = () => {
    if (!postForm.title || !postForm.content) {
      alert(lang === 'ar' ? 'يرجى ملء العنوان والمحتوى' : 'Please fill title and content');
      return;
    }

    const newPost: UpdatePost = {
      id: Date.now().toString(),
      title: postForm.title,
      content: postForm.content,
      imageUrl: postForm.imageUrl || 'https://images.unsplash.com/photo-1584281722571-066380c5963a?q=80&w=800',
      date: new Date().toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    };

    onAddUpdate(newPost);
    setPostForm({ title: '', content: '', imageUrl: '' });
    alert(lang === 'ar' ? 'تم النشر بنجاح' : 'Post published successfully');
  };

  const handleDelete = (id: string) => {
    const isConfirmed = window.confirm(lang === 'ar' ? 'هل أنت متأكد من حذف هذا المنشور نهائياً؟' : 'Are you sure you want to delete this post permanently?');
    if (isConfirmed) {
      onDeleteUpdate(id);
    }
  };

  if (!isAuthed) {
    return (
      <div className="max-w-md mx-auto py-20 px-6 animate-fade-in">
        <h1 className="text-3xl font-bold mb-8 text-center text-emerald-900">Admin Access</h1>
        <div className="space-y-4 bg-white p-8 rounded-3xl shadow-sm border">
          <input
            type="password"
            placeholder="Password"
            className="w-full p-4 border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          />
          <button onClick={handleLogin} className="w-full py-4 bg-emerald-700 text-white font-bold rounded-xl hover:bg-emerald-800 transition-all">
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-12 md:py-20 px-6 animate-fade-in space-y-12">
      <div className="flex justify-between items-center border-b pb-6">
        <h1 className="text-3xl font-bold text-emerald-900">{lang === 'ar' ? 'لوحة التحكم' : 'Admin Dashboard'}</h1>
        <button onClick={() => setIsAuthed(false)} className="text-red-500 font-bold hover:underline">Logout</button>
      </div>
      
      <div className="bg-white p-8 rounded-3xl shadow-sm border space-y-8">
        <h2 className="text-xl font-bold text-emerald-800 border-b pb-4 flex items-center gap-2">
           {lang === 'ar' ? 'إدارة العدادات' : 'Manage Stats'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Total Raised ($)</label>
            <input
              type="number"
              className="w-full p-3 border rounded-lg outline-none focus:border-emerald-500"
              value={formData.raised}
              onChange={(e) => setFormData({ ...formData, raised: parseInt(e.target.value) || 0 })}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Total Donors</label>
            <input
              type="number"
              className="w-full p-3 border rounded-lg outline-none focus:border-emerald-500"
              value={formData.donors}
              onChange={(e) => setFormData({ ...formData, donors: parseInt(e.target.value) || 0 })}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Families Supported</label>
            <input
              type="number"
              className="w-full p-3 border rounded-lg outline-none focus:border-emerald-500"
              value={formData.families}
              onChange={(e) => setFormData({ ...formData, families: parseInt(e.target.value) || 0 })}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Ramadan Start Date</label>
            <input
              type="date"
              className="w-full p-3 border rounded-lg outline-none focus:border-emerald-500"
              value={formData.ramadanDate}
              onChange={(e) => setFormData({ ...formData, ramadanDate: e.target.value })}
            />
          </div>
        </div>
        <button onClick={saveStats} className="px-8 py-3 bg-emerald-700 text-white font-bold rounded-lg hover:bg-emerald-800 transition-colors">
          {lang === 'ar' ? 'حفظ التغييرات' : 'Save Stats'}
        </button>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-sm border space-y-6">
        <h2 className="text-xl font-bold text-emerald-800 border-b pb-4">{lang === 'ar' ? 'إضافة تحديث جديد' : 'New Update'}</h2>
        <div className="space-y-4">
          <input 
            placeholder={lang === 'ar' ? 'عنوان الموضوع' : 'Post Title'} 
            className="w-full p-3 border rounded-lg outline-none focus:border-emerald-500" 
            value={postForm.title}
            onChange={(e) => setPostForm({...postForm, title: e.target.value})}
          />
          <textarea 
            placeholder={lang === 'ar' ? 'محتوى التحديث...' : 'Content...'} 
            className="w-full p-3 border rounded-lg h-32 outline-none focus:border-emerald-500" 
            value={postForm.content}
            onChange={(e) => setPostForm({...postForm, content: e.target.value})}
          />
          <input 
            placeholder={lang === 'ar' ? 'رابط الصورة (URL)' : 'Image URL'} 
            className="w-full p-3 border rounded-lg outline-none focus:border-emerald-500" 
            value={postForm.imageUrl}
            onChange={(e) => setPostForm({...postForm, imageUrl: e.target.value})}
          />
          <button onClick={publishPost} className="px-8 py-3 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-600 transition-all">
             {lang === 'ar' ? 'نشر التحديث' : 'Publish Update'}
          </button>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-sm border space-y-6">
        <h2 className="text-xl font-bold text-emerald-800 border-b pb-4">{lang === 'ar' ? 'إدارة المنشورات (الأحدث أولاً)' : 'Manage Posts'}</h2>
        <div className="grid grid-cols-1 gap-4">
          {updates.length === 0 ? (
            <p className="text-gray-400 italic text-center py-8">{lang === 'ar' ? 'لا توجد منشورات حالياً' : 'No posts yet'}</p>
          ) : (
            updates.map(post => (
              <div key={post.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border">
                <div className="flex items-center gap-4">
                  <img src={post.imageUrl} className="w-12 h-12 rounded-lg object-cover bg-gray-200" alt="" />
                  <div className="overflow-hidden">
                    <h4 className="font-bold text-emerald-900 truncate max-w-[200px] md:max-w-xs">{post.title}</h4>
                    <span className="text-xs text-gray-500">{post.date}</span>
                  </div>
                </div>
                <button 
                  onClick={() => handleDelete(post.id)}
                  className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all active:scale-90"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
