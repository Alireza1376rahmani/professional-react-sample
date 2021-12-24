import Icon from '@ant-design/icons';

const ParkingSVG = () => (
  <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <g clipPath='url(#clip0)'>
      <path
        d='M8.00003 5.71436H6.85716V8.00005H8.00003C8.63004 8.00005 9.14289 7.4872 9.14289 6.85718C9.14289 6.22717 8.63004 5.71436 8.00003 5.71436Z'
        fill='#717579'
      />
      <path
        d='M14.8571 0H1.14287C0.511735 0 0 0.511735 0 1.14287V14.8571C0 15.4883 0.511735 16 1.14287 16H14.8571C15.4883 16 16 15.4883 16 14.8571V1.14287C16 0.511735 15.4883 0 14.8571 0V0ZM8 10.2857H6.85713V12.5714H4.57143V3.42857H8C9.89064 3.42857 11.4286 4.96649 11.4286 6.85713C11.4286 8.74777 9.89064 10.2857 8 10.2857Z'
        fill='#717579'
      />
    </g>
    <defs>
      <clipPath id='clip0'>
        <rect width='16' height='16' fill='white' />
      </clipPath>
    </defs>
  </svg>
);

const ParkingIcon = props => <Icon component={ParkingSVG} {...props} />;

export default ParkingIcon;
