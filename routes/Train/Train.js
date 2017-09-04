/**
 * React App SDK (https://github.com/kriasoft/react-app)
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import Layout from '../../components/Layout';
import Link from '../../components/Link';
import s from './Train.css';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import axios from 'axios';

const title = 'Train unannotated images';
const style = {
  margin: 12,
};

class TrainPage extends React.Component {

  componentDidMount() {
    document.title = title;
  }

  state = {
    open: false,
    file: null
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleUpload = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('files',this.state.file);

    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };

    //axios.put(`http://iot4drone.mybluemix.net/image`, formData, config)
    axios.post(`http://localhost:1880/image`, formData, config)
    .then(res => {
      console.log(res);
    });
  };

  onFileChange = (e) => {
    this.setState({file:e.target.files[0]})
  }

  render() {
    const actions = [
      <FlatButton
        label="Finish"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <Layout className={s.content}>
        <div>
          <form onSubmit={this.handleUpload}> 
            <h4>Upload an image to Object Storage</h4>
            <input type="file" name="file" onChange={this.onFileChange}/>
            <RaisedButton label="Upload Image" secondary={true} style={style} type="submit"/>
          </form>
        </div> 
        <div>
          <h4>Correction and training</h4>
          <RaisedButton label="Start Training" secondary={true} style={style} onTouchTap={this.handleOpen}/>
        </div>
        <Dialog title="Train images" actions={actions} modal={false} open={this.state.open} onRequestClose={this.handleClose}>
          Hello
          <Card>
            <CardHeader
                title="URL Avatar"
                subtitle="Subtitle"
                avatar="images/jsa-128.jpg"
                />
                <CardMedia
                overlay={<CardTitle title="Abnormal" subtitle="0.16" />}
                >
                <img src="images/nature-600-337.jpg" alt="" />
                </CardMedia>
                <CardActions>
                <FlatButton label="Previous" />
                <FlatButton label="OK! Add to training set" />
                <FlatButton label="Need to Change" />
                <FlatButton label="Next" />
              </CardActions>
            </Card>
        </Dialog>
      </Layout>
    );
  }

}

export default TrainPage;
