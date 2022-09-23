import { call, take, put, all, takeEvery } from 'redux-saga/effects'
import { AUTH_START, authSuccess, authFail, LOGOUT_START, logoutSuccess, logoutFail } from '../auth/auth.action'
import { Button, Col, message, Row, Tooltip, Input } from 'antd'

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth, db } from '../../firebase/firebase_config'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { push } from 'connected-react-router'
import { history } from '../../utils'

const registerUser = async ({ email, password, username, fullname }) => {
    console.log('email, password', email)
    console.log('email, password', password)
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        console.log('res', res.status)
        await setDoc(doc(db, 'users', res.user.uid), {
            email,
            password,
            fullname,
            username,
            timestamp: serverTimestamp(),
        })
        return {
            userID: null,
            user: null,
        }
    } catch (error) {
        message.error('Đã có tài khoản trên hệ thống')
        console.log('error is :', error.message)
    }
}

function loginUser({ email, password }) {
    return (
        signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                // Lay id
                // const userToken = await userCredential.user.getIdToken()

                const userID = userCredential.user.uid
                console.log('userid', userID)
                const docRef = doc(db, 'users', userID)
                const docSnap = await getDoc(docRef)
                console.log('logged')
                console.log('infor', {
                    userID,
                    user: { ...docSnap.data() },
                })
                return {
                    userID,
                    user: { ...docSnap.data() },
                }
            })
            // .then((user) => user)
            .catch((error) => {
                console.log('error :', error.message)
            })
    )
}

function logoutUser() {
    return signOut(auth)
        .then(() => {})
        .catch((error) => {
            console.log('error :', error.message)
        })
}

function* authenticate({ email, password, isRegister, fullname, username }) {
    let data
    try {
        if (isRegister) {
            console.log('isRegister :', isRegister)
            data = yield call(registerUser, { email, password, fullname, username })
            console.log('data register :', data)
            history.push('/login')
        } else {
            data = yield call(loginUser, { email, password })
            console.log('data login123 :', data)
            history.push('/')
        }

        console.log('1', data)
        yield put(authSuccess(data))

        // dieu huong sang trang khac
        // history.push('/login')
        // yield put(push('/login'))
        // window.history.pushState({}, '', '/login')

        // Tai lai trang nhung bi reload
        // window.location.reload()

        return data
    } catch (error) {
        yield put(authFail(error.message))
        console.log('error.message', error.message)
    }
}
function* logout() {
    try {
        yield call(logoutUser)
        console.log('logout - start')
        yield put(logoutSuccess())
    } catch (error) {
        yield put(logoutFail())
    }
}
function* authFlow() {
    while (true) {
        const { payload } = yield take(AUTH_START)
        console.log('isRegister :: ', payload)
        const uid = yield call(authenticate, payload)

        console.log('uid :', uid)
        if (uid) {
            // yield take(LOGOUT_START)
            // yield call(logout)
        }
    }
}
function* authLogout() {
    yield takeEvery(LOGOUT_START, logout)
}
function* Saga() {
    yield all([authFlow(), authLogout()])
}

export default Saga
