import DatePicker from "../index.jsx";
import dayjs from 'dayjs';
const defaultValue = [dayjs('2000-01-01'), dayjs('2000-01-03'), dayjs('2000-01-05')];
function Demo1() {
    let date = "";
    function onChange(date, dateString) {
        console.log(date, dateString);
    }
    return (
        <div>
            <DatePicker
                multiple
                onChange={onChange}
                maxTagCount="responsive"
                defaultValue={defaultValue}
                size="small"
            />
            <DatePicker multiple onChange={onChange} maxTagCount="responsive" defaultValue={defaultValue} />
            <DatePicker
                multiple
                onChange={onChange}
                maxTagCount="responsive"
                defaultValue={defaultValue}
                size="large"
            />
        </div>
    )
}

export default Demo1;