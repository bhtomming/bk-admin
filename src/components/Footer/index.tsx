import { DefaultFooter } from '@ant-design/pro-components';
import '@umijs/max';
import React from 'react';
const Footer: React.FC = () => {
  const defaultMessage = '小贝壳技术部出品';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'old backend',
          title: '旧后台',
          href: 'https://a.no89.cn',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
