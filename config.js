// ค่าตั้งต้นของหน้าเว็บ — แก้ไฟล์นี้ไฟล์เดียวเมื่อติดตั้งหรือย้ายระบบไปบัญชีลูกค้า (ห้ามใส่ token หรือ secret ในไฟล์นี้ เพราะทุกคนเปิดดูได้)
const CONFIG = {
  // Web app URL ของ Apps Script (Deploy > Manage deployments) ลงท้ายด้วย /exec
  API_URL: 'https://script.google.com/macros/s/AKfycby4TzcH4FFhjjElMa-PvH27T8q21ZTzNlUzJVEZgDGdGw-9xb3JBTE6HWZc9DIBUtWm/exec',
  // LIFF ID จาก LINE Developers > LINE Login channel > LIFF
  LIFF_ID: '2012161133-LGkPzKg4',
  // Basic ID ของ OA เช่น @244rwmhe (ใช้กับปุ่มเพิ่มเพื่อนและปุ่มกลับไปที่แชท)
  OA_ID: '@244rwmhe',
  // ชื่อหมู่บ้านที่แสดงในหน้าแรก (เว้นว่างได้)
  VILLAGE_NAME: 'บ้านฮ่างต่ำเหนือ',
};
