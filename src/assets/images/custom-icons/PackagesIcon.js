import Icon from '@ant-design/icons';

const PackagesSvg = () => (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <g clipPath='url(#clip0)'>
      <path
        d='M11.992 24C11.913 24 11.833 23.981 11.761 23.943L0.269 17.943C0.104 17.857 0 17.686 0 17.5V6.24999C0 6.07699 0.09 5.91599 0.237 5.82499C0.384 5.73399 0.569 5.72599 0.723 5.80299L12.215 11.553C12.384 11.638 12.491 11.811 12.491 12V23.5C12.491 23.675 12.4 23.837 12.25 23.928C12.172 23.976 12.082 24 11.992 24ZM1 17.197L11.492 22.675V12.309L1 7.05899V17.197Z'
        fill='#717579'
      />
      <path
        d='M12.0078 24C11.9178 24 11.8278 23.976 11.7488 23.928C11.5998 23.837 11.5078 23.675 11.5078 23.5V12C11.5078 11.811 11.6148 11.638 11.7838 11.553L23.2758 5.803C23.4288 5.725 23.6148 5.733 23.7618 5.825C23.9098 5.916 23.9998 6.077 23.9998 6.25V17.5C23.9998 17.686 23.8958 17.857 23.7308 17.943L12.2388 23.943C12.1668 23.981 12.0868 24 12.0078 24ZM12.5078 12.309V22.675L22.9998 17.197V7.059L12.5078 12.309ZM23.4998 17.5H23.5098H23.4998Z'
        fill='#717579'
      />
      <path
        d='M0.499086 6.75002C0.315086 6.75002 0.139086 6.64902 0.0510862 6.47402C-0.0729138 6.22702 0.0280862 5.92702 0.275086 5.80302L11.7831 0.0530188C11.9241 -0.0169812 12.0901 -0.0169812 12.2301 0.0530188L23.7221 5.80302C23.9691 5.92702 24.0691 6.22702 23.9461 6.47402C23.8221 6.72102 23.5231 6.82002 23.2751 6.69802L12.0071 1.05902L0.723086 6.69702C0.651086 6.73302 0.575086 6.75002 0.499086 6.75002Z'
        fill='#717579'
      />
      <path
        d='M18.0001 15C17.7241 15 17.5001 14.776 17.5001 14.5V9.30898L6.28406 3.69698C6.03706 3.57398 5.93706 3.27298 6.06106 3.02598C6.18506 2.77898 6.48506 2.67998 6.73206 2.80198L18.2241 8.55198C18.3931 8.63798 18.5001 8.81098 18.5001 8.99998V14.5C18.5001 14.776 18.2761 15 18.0001 15Z'
        fill='#717579'
      />
    </g>
    <defs>
      <clipPath id='clip0'>
        <rect width='24' height='24' fill='white' />
      </clipPath>
    </defs>
  </svg>
);

const PackagesIcon = props => <Icon component={PackagesSvg} {...props} />;

export default PackagesIcon;