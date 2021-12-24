import Icon from '@ant-design/icons';

const UpgradesSvg = () => (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M23.5995 23.5606L22.8005 15.571C22.78 15.3661 22.607 15.2104 22.401 15.2114H22.0647C22.5543 13.9366 22.8038 12.5822 22.8005 11.2166C22.8091 5.03047 17.8012 0.00859987 11.615 1.10313e-05C5.42891 -0.0085778 0.407037 4.99931 0.398449 11.1855C0.38986 17.3716 5.39775 22.3934 11.5839 22.402C12.451 22.4032 13.3152 22.3038 14.1593 22.1056L14.0139 23.5605C13.9918 23.78 14.1519 23.9759 14.3714 23.998C14.3847 23.9993 14.398 24 14.4114 24H23.2C23.4206 24.0011 23.6003 23.8231 23.6014 23.6025C23.6015 23.5885 23.6009 23.5745 23.5995 23.5606ZM14.2432 21.2676C13.3851 21.4909 12.5019 21.6036 11.6151 21.6031C5.87877 21.6031 1.22857 16.9529 1.22857 11.2166C1.22857 5.48034 5.87877 0.830132 11.6151 0.830132C17.3514 0.830132 22.0016 5.48034 22.0016 11.2166C22.005 12.5882 21.7333 13.9466 21.2026 15.2114H20.8031C20.8031 14.1083 19.9088 13.214 18.8057 13.214C17.7026 13.214 16.8083 14.1083 16.8083 15.2114H15.2104C15.0052 15.2114 14.8334 15.3668 14.8129 15.571L14.2432 21.2676ZM20.0042 15.2114H17.6073C17.6073 14.5495 18.1438 14.013 18.8057 14.013C19.4676 14.013 20.0042 14.5495 20.0042 15.2114ZM14.8509 23.201L15.5699 16.0104H16.8083V16.8094C16.8083 17.03 16.9872 17.2088 17.2078 17.2088C17.4284 17.2088 17.6073 17.03 17.6073 16.8094V16.0104H20.0042V16.8094C20.0042 17.03 20.183 17.2088 20.4036 17.2088C20.6243 17.2088 20.8031 17.03 20.8031 16.8094V16.0104H22.0415L22.7606 23.201H14.8509Z'
      fill='#717579'
    />
    <path
      d='M16.0893 9.69858C16.0897 9.69823 16.0901 9.69783 16.0904 9.69748C16.2461 9.54119 16.2456 9.28822 16.0893 9.13252L11.8984 4.94197C11.7424 4.78603 11.4895 4.78603 11.3335 4.94197L7.14294 9.13252C7.14259 9.13287 7.14219 9.13327 7.14184 9.13362C6.98614 9.28992 6.98664 9.54289 7.14294 9.69858L8.27267 10.8239C8.42867 10.9799 8.68154 10.9799 8.83754 10.8239L10.4167 9.24717V17.2088C10.4167 17.4294 10.5956 17.6083 10.8162 17.6083H12.4141C12.6347 17.6083 12.8136 17.4294 12.8136 17.2088V9.24717L14.3947 10.8239C14.5507 10.9799 14.8036 10.9799 14.9596 10.8239L16.0893 9.69858ZM14.6751 9.97822L12.6961 8.00159C12.6213 7.92699 12.5199 7.88504 12.4142 7.88504C12.1936 7.88499 12.0147 8.06381 12.0146 8.28442V16.8093H11.2156V8.28442C11.2152 8.17926 11.1733 8.07854 11.0991 8.00409C10.9433 7.84784 10.6904 7.84744 10.5341 8.00319L8.5551 9.97822L7.99064 9.41375L11.6151 5.78927L15.2396 9.41535L14.6751 9.97822Z'
      fill='#717579'
    />
    <path
      d='M11.6147 19.2062C7.20218 19.2062 3.62513 15.6292 3.62513 11.2166C3.62513 6.80405 7.20218 3.227 11.6147 3.227C16.0273 3.227 19.6044 6.80405 19.6044 11.2166C19.6044 11.4372 19.7832 11.6161 20.0038 11.6161C20.2245 11.6161 20.4033 11.4372 20.4033 11.2166C20.4033 6.36282 16.4685 2.42804 11.6147 2.42804C6.76096 2.42804 2.82617 6.36282 2.82617 11.2166C2.82617 16.0704 6.76096 20.0052 11.6147 20.0052C11.8354 20.0052 12.0142 19.8263 12.0142 19.6057C12.0142 19.3851 11.8354 19.2062 11.6147 19.2062Z'
      fill='#717579'
    />
  </svg>
);

const UpgradesIcon = props => <Icon component={UpgradesSvg} {...props} />;

export default UpgradesIcon;
