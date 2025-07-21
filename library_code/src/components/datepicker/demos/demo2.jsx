import DatePicker from "../index.jsx";
const { RangePicker } = DatePicker;
function Demo1() {
    let date = "";
    function onChange(date, dateString) {
        console.log(date, dateString);
    }
    return (
        <div>
            <RangePicker />
            <RangePicker showTime />
            <RangePicker picker="week" />
            <RangePicker picker="month" />
            <RangePicker picker="quarter" />
            <RangePicker
                picker="year"
                id={{
                    start: 'startInput',
                    end: 'endInput',
                }}
                onFocus={(_, info) => {
                    console.log('Focus:', info.range);
                }}
                onBlur={(_, info) => {
                    console.log('Blur:', info.range);
                }}
            />
        </div>
    )
}

export default Demo1;