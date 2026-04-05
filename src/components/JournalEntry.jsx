import React, { useState } from 'react'

export default function JournalEntry({ entry, onDelete, onView, onEdit, onConvert, onReschedule }) {
  const [idx, setIdx] = useState(0)
  const photos = Array.isArray(entry.photos) ? entry.photos : []
  const count = photos.length
  const current = count > 0 ? photos[((idx % count) + count) % count] : null
  const today = new Date(); today.setHours(0,0,0,0)
  const hasDate = !!entry.date
  const d = hasDate ? new Date(entry.date) : null
  if (d) d.setHours(0,0,0,0)
  const isPast = entry.type==='planned' && hasDate && d < today
  const isSoon = entry.type==='planned' && hasDate && d >= today && ((d - today)/(1000*60*60*24)) <= 7

  return (
    <article>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:12,flexWrap:'wrap'}}>
        <h3 style={{margin:'4px 0',display:'flex',alignItems:'center',gap:8}}>
          {entry.location}
          <span style={{fontSize:12,padding:'2px 8px',borderRadius:999,background: entry.type==='planned' ? '#d1fae5' : '#ede9fe', color: entry.type==='planned' ? '#065f46' : '#5b21b6'}}>
            {entry.type==='planned' ? 'Заплановано' : 'Спогад'}
          </span>
          {entry.type==='planned' && hasDate && (
            <span style={{fontSize:12,padding:'2px 8px',borderRadius:999,background: isPast ? '#fee2e2' : (isSoon ? '#fef9c3' : '#e5e7eb'), color: isPast ? '#991b1b' : (isSoon ? '#92400e' : '#374151')}}>
              {isPast ? 'Минуло' : (isSoon ? 'Наближається' : 'Заплановано')}
            </span>
          )}
        </h3>
        <div className="meta" style={{color:'#6b7280'}}>
          {entry.type==='planned' ? (entry.date ? new Date(entry.date).toLocaleDateString() : 'Без дати') : (entry.date ? new Date(entry.date).toLocaleDateString() : '')}
        </div>
      </div>
      {entry.type==='planned' && (
        <div style={{display:'flex',gap:8,flexWrap:'wrap',marginTop:6}}>
          <button type="button" onClick={onReschedule} style={{background:'#f3f4f6',border:'0',padding:'6px 10px',borderRadius:8,cursor:'pointer',fontSize:12}}>Перенести</button>
          <button type="button" onClick={onConvert} style={{background:'#ede9fe',border:'0',padding:'6px 10px',borderRadius:8,cursor:'pointer',fontSize:12,color:'#5b21b6'}}>Позначити як спогад</button>
        </div>
      )}
      {count > 0 ? (
        <div style={{position:'relative', margin:'8px 0'}}>
          <img src={current.src} alt={`Фото ${((idx%count)+count)%count + 1}`} style={{display:'block',width:'100%',height:220,objectFit:'cover',borderRadius:8,border:'1px solid #e5e7eb'}} />
          <button onClick={()=>setIdx(i=>i-1)} aria-label="Попереднє фото" style={{position:'absolute',left:8,top:'50%',transform:'translateY(-50%)',background:'#ffffffcc',border:'1px solid #e5e7eb',borderRadius:999,padding:'4px 10px',cursor:'pointer'}}>‹</button>
          <button onClick={()=>setIdx(i=>i+1)} aria-label="Наступне фото" style={{position:'absolute',right:8,top:'50%',transform:'translateY(-50%)',background:'#ffffffcc',border:'1px solid #e5e7eb',borderRadius:999,padding:'4px 10px',cursor:'pointer'}}>›</button>
          <div style={{position:'absolute',right:8,bottom:8,background:'#111827cc',color:'#fff',fontSize:12,padding:'2px 8px',borderRadius:999}}>{((idx%count)+count)%count + 1}/{count}</div>
        </div>
      ) : (
        entry.photo ? (
          <img src={entry.photo} alt="Фото подорожі" style={{width:'100%',height:220,objectFit:'cover',borderRadius:8,margin:'8px 0'}} />
        ) : null
      )}
      {current?.caption ? <div style={{fontSize:'.9rem',color:'#4b5563'}}>{current.caption}</div> : (entry.description && <p style={{margin:'8px 0 0'}}>{entry.description}</p>)}
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8,marginTop:12}}>
        <button onClick={onView} style={{background:'#f3f4f6',border:'0',height:36,borderRadius:8,cursor:'pointer'}}>Переглянути</button>
        <button onClick={onEdit} style={{background:'#e0f2fe',border:'0',height:36,borderRadius:8,cursor:'pointer',color:'#075985'}}>Редагувати</button>
        <button onClick={onDelete} style={{background:'#fee2e2',color:'#991b1b',border:'0',height:36,borderRadius:8,cursor:'pointer'}}>Видалити</button>
      </div>
    </article>
  )
}
