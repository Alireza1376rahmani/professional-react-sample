import React from 'react';
import { withRouter } from 'react-router-dom';
import { LeftOutlined, UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { messageTypes } from './messages';
import { Avatar, Button, Col, Form, FormItem, Input, Paragraph, Row } from '../../atoms';
import ArchiveIcon from '../../../assets/images/custom-icons/ArchiveIcon';

const ChatWrapper = styled.div`
  background-color: #fff;
  padding: 15px 0;
  border-radius: 10px;

  .chat_list_wrapper {
    width: 100%;
    height: calc(100vh - 460px);
    overflow-y: auto;
    padding: 0 15px;

    &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-track {
      background: #fff;
    }

    &::-webkit-scrollbar-thumb {
      background: #a696cb;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: #886cc0;
    }

    .single_message {
      width: 100%;
      display: flex;
      margin: 30px 0;
      flex-direction: row;

      .message_text {
        padding: 15px;
        background-color: #f1eaff33;
        margin-right: 20%;
        margin-left: 0;
        border-radius: 10px;

        &.mine {
          background-color: #f1eaff69;
          margin-right: 0;
          margin-left: 20%;
        }
      }

      &.mine {
        flex-direction: row-reverse;
      }
    }
  }
`;

const messagesList = [
  {
    mine: true,
    text:
      'Message content Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do\n' +
      'eiusmod incididunt ut labore et dolore magna aliqua. ',
  },
  {
    mine: false,
    text:
      'Message content Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do\n' +
      'eiusmod incididunt ut labore et dolore magna aliqua. ',
  },
  {
    mine: true,
    text:
      'Message content Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do\n' +
      'eiusmod incididunt ut labore et dolore magna aliqua. ',
  },
  {
    mine: true,
    text:
      'Message content Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod \n' +
      'incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation\n' +
      'ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in\n' +
      'voluptate velit esse cillum dolore eu fugiat nulla pariatur. ',
  },
  {
    mine: false,
    text:
      'Message content Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do\n' +
      'eiusmod incididunt ut labore et dolore magna aliqua. ',
  },
  {
    mine: true,
    text:
      'Message content Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do\n' +
      'eiusmod incididunt ut labore et dolore magna aliqua. ',
  },
];

const MessageChat = ({ history, match }) => {
  const chatData = messageTypes[match?.params?.type];

  if (!chatData)
    return (
      <Row padding='30px' justify='center'>
        <Paragraph mb={0} fz={24} fw='600' type='secondary'>
          Chat not found
        </Paragraph>
      </Row>
    );
  return (
    <>
      <Row mb={15}>
        <Button
          type='dark_ghost'
          icon={<LeftOutlined />}
          padding='0'
          onClick={() => history.push('/messages')}
        >
          Back to Messages
        </Button>
      </Row>
      <ChatWrapper>
        <Row mb={15} padding='0 15px 15px' border_bot='1px solid #eeeeee'>
          <Avatar
            size={54}
            icon={chatData.icon}
            align='center'
            justify='center'
            icon_width='100%'
            padding='12px'
            back_color='#F1EAFF'
            margin='0 15px 0 0'
          />
          <Col align='center'>
            <Row>
              <Col span={24} align='flex-start'>
                <Paragraph mb={5}>{chatData.title}</Paragraph>
              </Col>
              <Col span={24} align='flex-start'>
                <Paragraph fz={12} mb={0} type='secondary'>
                  {chatData.description}
                </Paragraph>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row mb={15} justify='space-between' align='middle' padding='0 15px'>
          <Col align='center'>
            <Paragraph fz={12} mb={0} type='secondary' margin='0 15px 0 0'>
              Project name
            </Paragraph>
            <Paragraph fz={12} mb={0} type='secondary'>
              Unit #
            </Paragraph>
          </Col>
          <Col align='center'>
            <ArchiveIcon />
          </Col>
        </Row>
        <div className='chat_list_wrapper'>
          <div>
            {messagesList.map((el, index) => (
              <div className={`single_message ${el.mine ? 'mine' : ''}`} key={index}>
                <Avatar
                  size={45}
                  min_width='45px'
                  icon={el.mine ? <UserOutlined style={{ color: '#886CC0' }} /> : chatData.icon}
                  align='center'
                  justify='center'
                  icon_width='100%'
                  padding='12px'
                  back_color='#F1EAFF'
                  margin={el.mine ? '0 0 0 15px' : '0 15px 0 0'}
                />
                <div className={`message_text ${el.mine ? 'mine' : ''}`}>
                  <Paragraph mb={0}>{el.text}</Paragraph>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Row padding='15px'>
          <Form layout='inline' width='100%' justify='space-between'>
            <FormItem name='message' width='calc(100% - 120px)' margin_right='0'>
              <Input placeholder='Write something' />
            </FormItem>
            <FormItem margin_right='0'>
              <Button type='primary' htmlType='submit' width='100px'>
                Send
              </Button>
            </FormItem>
          </Form>
        </Row>
      </ChatWrapper>
    </>
  );
};

export default withRouter(MessageChat);
