import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import PaymentsRoundedIcon from '@mui/icons-material/PaymentsRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import LocalAtmRoundedIcon from '@mui/icons-material/LocalAtmRounded';
export const sidebarItems = [
  {
    title: 'Dashboard',
    icon: <DashboardRoundedIcon />,
  },
  {
    title: 'Expenses',
    icon: <PaymentsRoundedIcon />,
  },
  {
    title: 'Incomes',
    icon: <LocalAtmRoundedIcon />,
  },
  {
    title: 'Budget',
    icon: <SavingsOutlinedIcon />,
  },
  {
    title: 'Settings',
    icon: <SettingsRoundedIcon />,
  },
];
