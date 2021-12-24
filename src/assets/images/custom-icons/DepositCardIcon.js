import Icon from '@ant-design/icons';

const DepositCardSVG = () => (
  <svg width='24' height='21' viewBox='0 0 24 21' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M8.49999 18H2.5C1.122 18 0 16.878 0 15.5V2.5C0 1.122 1.122 0 2.5 0H21.5C22.878 0 24 1.122 24 2.5V7.5C24 7.77599 23.776 7.99999 23.5 7.99999C23.224 7.99999 23 7.77599 23 7.5V2.5C23 1.673 22.327 0.999999 21.5 0.999999H2.5C1.673 0.999999 0.999999 1.673 0.999999 2.5V15.5C0.999999 16.327 1.673 17 2.5 17H8.49999C8.77599 17 8.99999 17.224 8.99999 17.5C8.99999 17.776 8.77599 18 8.49999 18Z'
      fill='#886CC0'
    />
    <path
      d='M7.5 13H0.5C0.224 13 0 12.776 0 12.5V5.5C0 5.224 0.224 5 0.5 5H7.5C8.87799 5 9.99999 6.122 9.99999 7.5V8.17C9.99999 8.446 9.77599 8.67 9.49999 8.67C9.22399 8.67 8.99999 8.446 8.99999 8.17V7.5C8.99999 6.673 8.32699 6 7.5 6H0.999999V12H7.5C7.772 11.934 8.04 12.102 8.10499 12.37C8.16999 12.638 8.007 12.911 7.739 12.976C7.64 13 7.556 13 7.5 13Z'
      fill='#886CC0'
    />
    <path
      d='M5 11C3.897 11 3 10.103 3 9C3 7.897 3.897 7 5 7C6.103 7 7 7.897 7 9C7 10.103 6.103 11 5 11ZM5 8C4.449 8 4 8.449 4 9C4 9.551 4.449 10 5 10C5.551 10 6 9.551 6 9C6 8.449 5.551 8 5 8Z'
      fill='#886CC0'
    />
    <path
      d='M17.5 18.5C17.224 18.5 17 18.276 17 18V17.25C17 16.974 17.224 16.75 17.5 16.75C17.776 16.75 18 16.974 18 17.25V18C18 18.276 17.776 18.5 17.5 18.5Z'
      fill='#886CC0'
    />
    <path
      d='M17.75 17.5H16C15.724 17.5 15.5 17.276 15.5 17C15.5 16.724 15.724 16.5 16 16.5H17.75C18.164 16.5 18.5 16.164 18.5 15.75C18.5 15.336 18.164 15 17.75 15H17.25C16.285 15 15.5 14.215 15.5 13.25C15.5 12.285 16.285 11.5 17.25 11.5H19C19.276 11.5 19.5 11.724 19.5 12C19.5 12.276 19.276 12.5 19 12.5H17.25C16.836 12.5 16.5 12.836 16.5 13.25C16.5 13.664 16.836 14 17.25 14H17.75C18.715 14 19.5 14.785 19.5 15.75C19.5 16.715 18.715 17.5 17.75 17.5Z'
      fill='#886CC0'
    />
    <path
      d='M17.5 12.25C17.224 12.25 17 12.026 17 11.75V11C17 10.724 17.224 10.5 17.5 10.5C17.776 10.5 18 10.724 18 11V11.75C18 12.026 17.776 12.25 17.5 12.25Z'
      fill='#886CC0'
    />
    <path
      d='M17.5 21C13.916 21 11 18.084 11 14.5C11 10.916 13.916 8 17.5 8C21.084 8 24 10.916 24 14.5C24 18.084 21.084 21 17.5 21ZM17.5 9C14.467 9 12 11.467 12 14.5C12 17.533 14.467 20 17.5 20C20.533 20 23 17.533 23 14.5C23 11.467 20.533 9 17.5 9Z'
      fill='#886CC0'
    />
  </svg>
);

const DepositCardIcon = props => <Icon component={DepositCardSVG} {...props} />;

export default DepositCardIcon;
