import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';
import { memo } from 'react';
import {
    Row, Tab, Nav, Col,
} from 'react-bootstrap';
import { AdminAchievements } from '../AdminAchievements/AdminAchievements';
import { AdminTasks } from '../AdminTasks/AdminTasks';
import { AdminMarket } from '../AdminMarket/AdminMarket';
import classes from './AdminPanelPage.module.scss';

interface AdminPanelPageProps {
    className?: string;
}

const AdminPanelPage = memo((props: AdminPanelPageProps) => {
    const {
        className,
    } = props;

    return (
        <Page className={classNames(classes.AdminPanelPage, {}, [className])}>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="first">Достижения</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second">Задачи</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="third">Маркет</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <AdminAchievements />
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <AdminTasks />
                            </Tab.Pane>
                            <Tab.Pane eventKey="third">
                                <AdminMarket />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Page>
    );
});

export default AdminPanelPage;
