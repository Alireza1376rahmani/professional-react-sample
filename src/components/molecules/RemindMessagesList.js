import React from 'react';
import { Avatar, List } from 'antd';
import { withRouter } from 'react-router-dom';
import { Button, ContentWrapper, Tabs, Paragraph } from '../atoms';

const { TabPane } = Tabs;

const messagesData = [1, 2, 3, 4, 5, 6].map(el => ({
  id: el,
  title: 'Message Title',
  content: 'Message content',
}));

const remindersData = [1, 2, 3, 4, 5, 6].map(el => ({
  id: el,
  title: 'Reminder Title',
  content: 'Reminder content',
}));

const RemindMessagesList = ({ history }) => {
  return (
    <ContentWrapper mb={30} padding='0 30px 10px' height='520px'>
      <Tabs
        tab_btn_fw={500}
        tab_btn_fz={18}
        tab_btn_padding='13px 0 12px'
        active_tab_btn_fw={500}
        active_tab_btn_color='#886CC0'
        defaultActiveKey='messages'
        tabBarExtraContent={
          <Button
            type='primary'
            sectype='ghost'
            padding='0'
            onClick={() => history.push('/messages')}
          >
            View All
          </Button>
        }
      >
        <TabPane tab='Reminders' key='reminders'>
          <List
            dataSource={remindersData}
            renderItem={item => (
              <List.Item key={item.id}>
                <List.Item.Meta avatar={<Avatar />} title={item.title} description={item.content} />
                <Paragraph type='secondary' fz={12}>
                  02/21/2021
                </Paragraph>
              </List.Item>
            )}
          />
        </TabPane>
        <TabPane tab='Messages' key='messages'>
          <List
            dataSource={messagesData}
            renderItem={item => (
              <List.Item key={item.id}>
                <List.Item.Meta avatar={<Avatar />} title={item.title} description={item.content} />
                <Paragraph type='secondary' fz={12}>
                  02/21/2021
                </Paragraph>
              </List.Item>
            )}
          />
        </TabPane>
      </Tabs>
    </ContentWrapper>
  );
};

export default withRouter(RemindMessagesList);
