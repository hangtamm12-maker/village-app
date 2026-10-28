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
  // จุดกึ่งกลางของ "แผนที่จริง" ในฟอร์มแจ้งเหตุ [ละติจูด, ลองจิจูด] (ใน Google Maps กดค้างที่กลางหมู่บ้านแล้วคัดลอกตัวเลข)
  MAP_CENTER: [19.289861, 99.498438],
  // จุดอ้างอิง 2 จุดบนแผนผังหมู่บ้าน (assets/village-map.png): x,y เป็น % ของรูป, lat/lng จาก Google Maps (กดค้างที่จุดนั้นแล้วคัดลอกตัวเลข)
  // ใส่แล้วหมุดอุปกรณ์จากชีต MapPins จะแสดงบนแผนที่ดาวเทียมด้วย (เอา // ออกเมื่อใส่ lat/lng ครบ)
  // MAP_REF: [
  //   { x: 62.9, y: 28.1, lat: 0, lng: 0 }, // หมุดร้านก๋วยเตี๋ยวแนนตี๋
  //   { x: 36.4, y: 67.3, lat: 0, lng: 0 }, // หมุดวัดฮ่างต่ำ
  // ],
};
