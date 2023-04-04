import { Page } from 'widgets/Page/Page';
import { RegistrationForm } from 'features/AuthByUsername';
import { Sidebar } from 'shared/UI/Sidebar';
import { useState } from 'react';
import { Button } from 'react-bootstrap';

const MainPage = () => {
    const [show, setShow] = useState<boolean>(false);

    return (
        <Page>
            <Button
                onClick={() => setShow(true)}
                variant="outline-secondary"
            >
                Показать
            </Button>
            <Sidebar
                direction="end"
                show={show}
                setShow={setShow}
                header="Сайдбар"
            >
                <RegistrationForm />
            </Sidebar>
        </Page>
    );
};

export default MainPage;
