export const validateDate =(startDate,expiryDate)=>{
    var invalidDate=false;
    if(startDate<expiryDate){
        return invalidDate=false;
    } else {
        return invalidDate=true;
    }
}