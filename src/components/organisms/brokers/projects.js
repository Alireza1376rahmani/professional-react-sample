import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, Paragraph } from '../../atoms';
import SingleProjectCard from '../../molecules/SingleProjectCard';
import { getProjects, projectsValuesLoading } from '../../../selectors/projects';
import { fetchProjects } from '../../../actions/projects';

const Projects = ({ pageTitle, redirectUrl }) => {
  const dispatch = useDispatch();
  const { projects = [] } = useSelector(getProjects);
  const loading = useSelector(projectsValuesLoading);
  const projectsData = projects || [];
  useEffect(() => {
    dispatch(fetchProjects.request({ _sort: 'ProjectName' }));
  }, []);

  return (
    <>
      <Paragraph type='secondary' fz={24} fw={600}>
        {pageTitle || 'Projects'}
      </Paragraph>
      <List
        dataSource={projectsData}
        loading={loading}
        itemLayout='vertical'
        item_back='#fff'
        item_padding='30px'
        item_radius='20px'
        item_cursor='pointer'
        total_pos='left'
        meta_mb={30}
        item_shadow='0px 4px 4px rgba(0, 0, 0, 0.04)'
        item_hover_shadow='0 3px 4px 1px #0000001c'
        title_mb={0}
        grid={{ gutter: 24, xs: 1, sm: 1, md: 1, lg: 2, xl: 2, xxl: 3 }}
        pagination={{
          pageSize: 10,
          showSizeChanger: false,
          hideOnSinglePage: true,
          showTotal: (total, current) => (
            <Paragraph type='secondary' fw={400} fz={16}>
              Showing {current[0]}-{current[1]} of {projectsData.length}
            </Paragraph>
          ),
        }}
        renderItem={item => <SingleProjectCard item={item} redirectUrl={redirectUrl} />}
      />
    </>
  );
};

export default Projects;
