// ค่าตั้งต้นของหน้าเว็บ — แก้ไฟล์นี้ไฟล์เดียวเมื่อติดตั้งหรือย้ายระบบไปบัญชีลูกค้า (ห้ามใส่ token หรือ secret ในไฟล์นี้ เพราะทุกคนเปิดดูได้)
const CONFIG = {
  // Web app URL ของ Apps Script (Deploy > Manage deployments) ลงท้ายด้วย /exec
  API_URL: 'https://script.google.com/macros/s/XXXX/exec',
  // LIFF ID จาก LINE Developers > LINE Login channel > LIFF
  LIFF_ID: 'XXXX',
  // Basic ID ของ OA เช่น @244rwmhe (ใช้กับปุ่มเพิ่มเพื่อนและปุ่มกลับไปที่แชท)
  OA_ID: '',
  // ชื่อหมู่บ้านที่แสดงในหน้าแรก (เว้นว่างได้)
  VILLAGE_NAME: '',
};
