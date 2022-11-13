import DatePicker from "react-native-datepicker"
import React, {useState} from 'react'

export default function  DatePikerComponent ({handleDateChange, id}) {

    const [open, setOpen] = useState(false)
    const [date, setDate] = useState(new Date())

    const dateChange = (date) => {
        setOpen(false)
        setDate(date)
        handleDateChange(date, id)
    }
    return (
    <DatePicker
              modal
              open={open}
              onDateChange={d => {
                dateChange(d)
              }}
              style={{width: 200,
                marginTop: 5,}}
              date={date} // Initial date from state
              mode="date" // The enum of date, datetime and time
              placeholder="select date"
              format="MM/DD/YYYY"
              minDate="01/01/2022"
              maxDate="01/01/2030"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  right: -5,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  borderColor: "gray",
                  alignItems: "flex-start",
                  borderWidth: 0,
                  borderBottomWidth: 1,
                },
                placeholderText: {
                  fontSize: 17,
                  color: "gray"
                },
                dateText: {
                  fontSize: 17,
                }
              }}
            />
    )
}