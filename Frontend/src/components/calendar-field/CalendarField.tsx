// Components
import { Calendar } from 'primereact/calendar';
// Images
// Imports
// Styles
import s from './CalendarField.module.scss';

export interface ICalendarFieldProps {
    fildName: string;
    fildLabel: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formik: any;
    placeholder?: string;
    disabled?: boolean;
}

export default function CalendarField({
  fildName, fildLabel, formik,
  placeholder = "00/00/0000", disabled
}: ICalendarFieldProps) {
    return (
        <main className={s.wrapperMain}>
            <label>{fildLabel}</label>
            <Calendar
                name={fildName}
                value={formik.values[fildName] ? new Date(formik.values[fildName]) : null}
                onChange={(e) => formik.setFieldValue(fildName, e.value)}
                placeholder={placeholder}
                className={s.field}
                disabled={disabled}
                showButtonBar
                mask="99/99/9999"
                dateFormat="dd/mm/yy"
                pt={{
                    panel: { className: s.customCalendarPanel },
                    group: { className: s.customCalendarGroup },
                    header: { className: s.customCalendarHeader },
                    previousButton: { className: s.customCalendarButtons },
                    nextButton: { className: s.customCalendarButtons },
                    title: { className: s.customCalendarTitle },
                    monthTitle: { className: s.customCalendarMonthTitle },
                    yearTitle: { className: s.customCalendarYearTitle },
                    weekDay: { className: s.customCalendarWeekDay },
                    day: { className: s.customCalendarDay },
                    dayLabel: { className: s.customCalendarDayLabel },
                    buttonbar: { className: s.customCalendarButtonBar },
                }}
            />
            {formik.touched[fildName] && formik.errors[fildName] && (
                <small className={s.errorMessage}>{formik.errors[fildName]}</small>
            )}
        </main>
    );
}
