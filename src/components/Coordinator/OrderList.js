//Not sure why the ScrollView is not working. Will fix it next time

import React, { Component } from 'react';
import { ScrollView, FlatList } from 'react-native';
import OrderDetails from './OrderDetails';
import { db, auth } from '../../config';

class OrderList extends Component {
    constructor(props) {
        super(props);
        const count = Object.entries(this.props.order.foodOrders).length;
        console.log(count);
        // this.state = { jioJoinerNum: count }
        // const count = Object.entries(this.props.order.foodOrders).length;
        // this.getUserInfoThenDatabase()
        // this.add();
    }
    
    // add() {
    //     this.state = {
    //         add: 'just try'
    //     }
    //     console.log(this.state.add);
    //     console.log(this.state.count);
    // }
    // getUserInfoThenDatabase() {
    //     const user = auth.currentUser
    //     if(user != null) {
    //         let dbLocation = '/users/' + user.uid + '/displayName/';
    //         db
    //         .ref(dbLocation)
    //         .on('value', snapshot => {
    //             if ( snapshot.val() === null ) {
    //                 console.log('NOTHING GRABBED IN DATA')
    //                 return null;
    //             } else {
    //                 const data = snapshot.val()
    //                 const count = Object.entries(this.props.order.foodOrders).length;
    //                 this.state = { 
    //                     jioJoinerNum: count, 
    //                     uid: user.uid,
    //                     displayName: data
    //                 };
    //                 console.log('USER INFO LOADED INTO INITIATED')
    //             }
    //         });
    //     }
    // }

    // componentDidMount() {
    //     this.getUserInfoThenDatabase()
    // }

    renderJio = ({item}) => (
        <OrderDetails
            order={this.props.order}
            orderDetails={item[1]}
            jioJoinOrderId={item[0]}
            jioOrderId={this.props.jioOrderId}
            // jioJoinerNum={this.state.jioJoinerNum}
        />
    );

    keyExtractor = (item) => (
        item[1].joinerName
    );

    render() {
        // this.getUserInfoThenDatabase()
        // console.log(this.state.userData.displayName);
        // console.log(this.state.displayName);
        // console.log(this.state.jioJoinerNum);
        // console.log(this.state.uid);
        return(
            <FlatList 
                data={Object.entries(this.props.order.foodOrders)}
                renderItem={this.renderJio}
                keyExtractor={this.keyExtractor}
            />
        );
    }
    
}

export default OrderList;