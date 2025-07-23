
function Demo1() {
    let date = "";
    function onChange(date, dateString) {
        console.log(date, dateString);
    }
    return (
        <div>
            <DatePicker onChange={onChange} />
            <DatePicker onChange={onChange} picker="week" />
            <DatePicker onChange={onChange} picker="month" />
            <DatePicker onChange={onChange} picker="quarter" />
            <DatePicker onChange={onChange} picker="year" />
        </div>
    )
}

export default Demo1;