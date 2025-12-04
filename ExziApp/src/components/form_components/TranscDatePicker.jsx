import { useState } from 'react';
import { format } from 'date-fns';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';

// 1. Import the *Static* DatePicker
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// 2. We still need the theme to make the calendar dark
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3b82f6', // A blue color
    },
    background: {
      paper: '#0b1215', // The calendar popup background
    },
  },
});

export default function TranscDatePicker() {
  const [selectedDate, setSelectedDate] = useState(null);

  // 3. The parent Field is flex-col. 'grow' makes this component
  //    fill the remaining vertical space.
  return (
    <Popover className="relative grow">
      {({ close }) => (
        <>
          {/* 4. This is your custom button. 'h-full' makes it fill
               the 'grow' Popover container. */}
          <PopoverButton className="flex items-center justify-between w-full h-full px-3 py-2 text-left text-white bg-transparent border border-[#646464] rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <span>
              {selectedDate ? format(selectedDate, 'MM/dd/yyyy') : 'Select a date'}
            </span>
          </PopoverButton>

          {/* 5. This is the dropdown panel. It's positioned relative
               to the button. 'z-10' keeps it on top. */}
          <PopoverPanel
            anchor="bottom start"
            className="z-1010 mt-2 bg-[#0b1215] rounded-lg shadow-lg"
          >
            {/* 6. Put the StaticDatePicker INSIDE the panel */}
            <ThemeProvider theme={darkTheme}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <StaticDatePicker
                  value={selectedDate}
                  onChange={(newDate) => {
                    setSelectedDate(newDate);
                    close(); // This closes the popover on selection
                  }}
                  onAccept={() => close()}

                  slotProps={{
                    toolbar: {
                      hidden: true,
                    },
                  }}
                />
              </LocalizationProvider>
            </ThemeProvider>
          </PopoverPanel>
        </>
      )}
    </Popover>
  );
}