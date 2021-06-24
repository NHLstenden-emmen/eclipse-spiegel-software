function display_calender(){
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
    "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
    dateObj = new Date()
    try {
        document.getElementById('Month').innerHTML = monthNames[new Date().getMonth()];
        document.getElementById('today').innerHTML = new Date().getDate();
        document.getElementById('year').innerHTML = new Date().getFullYear();
    } catch (error) {
        return;
    }
}
