import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap'

import { setRedirectRoute } from '../../state/actions/app.js';