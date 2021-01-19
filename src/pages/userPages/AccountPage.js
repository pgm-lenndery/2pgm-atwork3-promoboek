import React, { useEffect, useState } from 'react';
import { Button, Loader, Modal, Wrapper, Form, FormButton, FormField, EditField } from '../../components';
import { useAuth, useFirebaseStorage, useFirestoreCrud } from '../../firebase';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { UserProjectsPage } from '..';


export default () => {
    const { user, logout } = useAuth();
    const { getDownloadURL, state: { data: userAvatar = '' } } = useFirebaseStorage(user.avatar);
    const [ editMode, setEditMode ] = useState(false);

    const { updateDocument } = useFirestoreCrud();
    
    useEffect(() => {
        getDownloadURL();
    }, [])

    const handleEdit = ({ email, ...otherData }) => {
      updateDocument({
        ...otherData
      }, `users/${ user.uid }`)

      setEditMode(false);
    }
    
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
                          { editMode ?
                            <>
                              <div className="col-12 col-lg-3">
                                  { !userAvatar ? <Loader /> : <img width="100%" src={ userAvatar } />}
                              </div>
                              <div className="col-12 col-lg-9">

                              <Form onSubmit={handleEdit}>
                                <div className="row form-element">
                                    <div className="col">
                                        <FormField name="firstName" label="Voornaam" type="text"/>
                                    </div>
                                    <div className="col">
                                        <FormField name="lastName" label="Achternaam" type="text"/>
                                    </div>
                                </div>
                                <FormField name="email" label="Email" type="text"/>
                                <FormButton title="Edit" />
                                <Button title="Cancel" onClick={() => setEditMode(false)} />
                            </Form>

                              </div>
                            </>
                          :
                            <>
                              <div className="col-12 col-lg-3">
                                  { !userAvatar ? <Loader /> : <img width="100%" src={ userAvatar } />}
                              </div>
                              <div className="col-12 col-lg-9">
                                  <h3 className="text--initial">{ user.firstName } { user.lastName }</h3>
                                  <p className="small label">{ user.email }</p>
                                  <Button title="Account Aanpassen" onClick={() => setEditMode(true)} />
                                  <Button title="Afmelden" onClick={logout} />
                              </div>
                            </>
                          }
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