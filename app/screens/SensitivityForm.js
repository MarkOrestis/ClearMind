import React, { Component } from "react";
import {
    View,
    Text,
} from "react-native";
import {
    Container,
    Header,
    List,
    ListItem,
    Body,
    Left,
    Right,
    Icon,
    Button
} from 'native-base'

export default class SensitivityForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
             sensitivities: []
        };
    }

    renderHeader() {
        return(
            <Header>
                <Left />
                <Body>
                <Text>My Sensitivities</Text>
                </Body>
                <Right>
                    {/* <Button transparent onPress={ () => {this.newSensitivitiesForm()}}>
                        <Icon name="create" />
                    </Button> */}
                </Right>
            </Header>
        );
    }

    render() {
        return(
            <Container>
                {this.renderHeader()}
                {this.renderList()}
            </Container>
        );
    }

    renderList() {
        if (this.state.sensitivities.length == 0) {
            return (
                <View>
                    <Text style={{textAlign: 'center', marginTop:10, fontSize:15}}>You do not currently have any applications. Click above to start one!</Text>
                </View>
            )
        } else {
            return (
                <Content>

                    <List dataArray={this.state.sensitivities}
                          renderRow={(item) =>
                              <ListItem>
                                  <Body style={{flex: 1, flexDirection: 'row'}}>
                                  </Body>
                                  <Right>
                                  </Right>
                              </ListItem>
                          }>
                    </List>
                </Content>
            )
        }
    }

    newSensitivitiesForm() {
        this.props.navigation.navigate('EditSensitivities');
    }
}