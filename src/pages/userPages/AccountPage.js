import React, { useEffect } from 'react';
import { Button, Loader, Modal, Wrapper } from '../../components';
import { useAuth, useFirebaseStorage } from '../../firebase';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { UserProjectsPage } from '..';


export default () => {
    const { user, logout } = useAuth();
    const { getDownloadURL, state: { data: userAvatar = '' } } = useFirebaseStorage(user.avatar);
    
    useEffect(() => {
        getDownloadURL();
    }, [])
    
    return (
        <Modal 
            title={ `Hi ${ user.firstName }` } 
            subtitle="beheer je account"
            ignorePadding
        >
            <Tabs>
                <TabList>
                    <Tab>Account</Tab>
                    <Tab>Projects</Tab>
                </TabList>

                <Wrapper>
                    <TabPanel>
                        <div className="row">
                            <div className="col-12 col-lg-3">
                                { !userAvatar ? <Loader /> : <img width="100%" src={ userAvatar } />}
                            </div>
                            <div className="col-12 col-lg-9">
                                <h3 className="text--initial-case">{ user.firstName } { user.lastName }</h3>
                                <p className="small label">{ user.email }</p>
                                <Button title="Afmelden" onClick={logout} />
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <UserProjectsPage />
                    </TabPanel>
                </Wrapper>
            </Tabs>
        </Modal>
    )
}