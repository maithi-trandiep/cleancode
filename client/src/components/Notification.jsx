import * as React from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

const Notification = () => {
    const [dateSelected, setDateSelected] = React.useState(dayjs(new Date()));
    const [showReminder, setShowReminder] = React.useState(false);

    const handleChange = (newDate) => {
        setDateSelected(newDate);
    };

    const handleClose = () => {
        var reminder = new Date(dayjs(dateSelected).format('YYYY-MM-DD HH:mm'));
        var today = new Date();
        if (reminder > today) {
            setTimeout(() => {
                setShowReminder(true);
            }, reminder - today);
        }
    };

    return (
        <div>
            { showReminder && <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                    Time to take a quiz!
                </Alert> 
            }
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker label="Set quiz reminder"
                    value={dateSelected}
                    onClose={handleClose}
                    onChange={(e) => handleChange(e)}
                />
            </LocalizationProvider>
        </div>
    );
}
export default Notification;