export default {
    formatStatusTH(status){
        if(status === 'Waiting approve'){
            return 'รอตรวจสอบเอกสาร'
        }
        else if(status === 'Appointment required'){
            return 'รอบันทึกวันนัดหมาย'
        }
        else if(status === 'Explore required'){
            return 'รอออกสำรวจทรัพย์สิน'
        }
        else if(status === 'Exploring'){
            return 'กำลังออกสำรวจทรัพย์สิน'
        }
        else if(status === 'Appraised'){
            return 'ประเมินมูลค่าเรียบร้อย'
        }
        else if(status === 'Success'){
            return 'เสร็จสิ้น'
        }
    },
    formatTypeTH(type){
        if(type === 'Detached house'){
            return 'บ้านเดี่ยว'
        }
        else if(type === 'Townhouse'){
            return 'ทาวเฮาส์'
        }
        else if(type === 'Condo'){
            return 'คอนโด'
        }
        else if(type === 'Waste land'){
            return 'ที่ดินเปล่า'
        }
        else if(type === 'Developed housing'){
            return 'โครงการจัดสรรค์'
        }
    },
    formatYearTH(year){
        return parseInt(year)+543
    },
    formatRoleTH(role){
        if(role === 'Admin'){
            return 'แอดมิน'
        }
        else if(role === 'Employee'){
            return 'พนักงาน'
        }
        else{
            return 'ลูกค้า'
        }
    },
}