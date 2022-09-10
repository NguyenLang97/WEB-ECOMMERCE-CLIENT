import { useState, useEffect } from 'react'
import { doc, setDoc, addDoc, collection, serverTimestamp, onSnapshot, getDoc } from 'firebase/firestore'
import { Button, Col, Input, message, Pagination, Progress, Rate, Row } from 'antd'
import { db } from '../../../firebase/firebase_config'
import { useDispatch, useSelector } from 'react-redux'
import 'antd/dist/antd.css'
import { Link, useParams } from 'react-router-dom'
import defaultAvt from '../../../assets/images/default-avt.png'
import RootReducerState from '../../../models/root_reducer'
import CommentUserState from '../../../models/comment_user'

import './comment.scss'

const Comment = () => {
    const { id } = useParams()
    console.log({ id })
    const [reviewMsg, setReviewMsg] = useState('')
    const [data, setData] = useState<any>()
    const [ractingValue, setRactingValue] = useState(0)

    const currentUser = useSelector((state: RootReducerState) => state.AuthReducer.currentUser)
    const username = useSelector((state: RootReducerState) => state.AuthReducer.infoUser?.username)
    const img = useSelector((state: RootReducerState) => state.AuthReducer.infoUser?.img) || defaultAvt
    const docRef = doc(db, 'comment', id as string)
    useEffect(() => {
        const docSnap = async () => {
            await getDoc(docRef).then((docSnap) => {
                if (docSnap.exists()) {
                    setData({ ...docSnap.data() })
                } else {
                    console.log('No such document!')
                }
            })
        }
        docSnap()
    }, [])

    const commentHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const commentUser = [{ idUser: currentUser, nameUser: username, imgUser: img, commentTitle: reviewMsg, date: new Date(), userRacting: ractingValue }]
        setReviewMsg('')
        console.log({ commentUser })
        try {
            await setDoc(doc(db, 'comment', id as string), {
                commentUser: [...commentUser],
                timeStamp: serverTimestamp(),
            })
        } catch (err) {
            console.log(err)
        }
        if (data) {
            console.log({ ractingValue })
            const commentUser = [...data.commentUser, { idUser: currentUser, nameUser: username, imgUser: img, commentTitle: reviewMsg, date: new Date(), userRacting: ractingValue }]
            console.log('commentUser', commentUser)
            try {
                await setDoc(doc(db, 'comment', id as string), {
                    commentUser: [...commentUser],
                    timeStamp: serverTimestamp(),
                })
            } catch (err) {
                console.log(err)
            }
        }
        const docSnap = async () => {
            await getDoc(docRef).then((docSnap) => {
                if (docSnap.exists()) {
                    setData({ ...docSnap.data() })
                } else {
                    console.log('No such document!')
                }
            })
        }
        docSnap()
    }
    function setDate(unixTime: number) {
        const date = new Date(unixTime * 1000)
        // console.log(date.toLocaleDateString('en-US'))
        return date.toLocaleDateString('en-US')
    }
    console.log({ data })

    // console.log({ ractingValue })

    // //Tong so tat ca binh luan
    const rateTotals = data?.commentUser.length

    // // tim user danh gia sao >0
    const positiveStar = data?.commentUser.filter((star: any) => star.userRacting > 0)
    const numberStart = (number: number) => data?.commentUser.filter((star: CommentUserState) => star.userRacting === number).length
    console.log('1', numberStart(1))
    // const towStar = data?.commentUser.filter((star) => (star.userRacting = 2))

    //từ tù
    const starAvg = positiveStar?.reduce((totalStar: number, star: CommentUserState) => totalStar + star.userRacting, 0) / positiveStar?.length
    // console.log('1', typeof Math.floor(starAvg) == 'number' && Math.floor(starAvg) > 0)

    const rates = [1, 2, 3, 4, 5]

    const isAuth = useSelector((state: RootReducerState) => state.AuthReducer.currentUser)

    return (
        <div className="comment p-12">
            <div className=" d-flex align-items-center gap-5 py-3">
                <h3 className="rev">Nhận xét của khách hàng</h3>
            </div>
            {/* đánh giá tổng quan */}
            <Col span={24} className="p-16">
                <h3 className="font-size-28px">Đánh giá</h3>
                <div className="overview d-flex p-tb-16">
                    {/* tổng kết */}
                    <div className="d-flex flex-column align-items-center bor-right">
                        <h3 className="font-size-32px">{starAvg.toFixed(1) === 'NaN' ? 0 : starAvg.toFixed(1)}</h3>
                        {/* <Rate disabled defaultValue={Math.floor(starAvg)} */}

                        {typeof Math.floor(starAvg) == 'number' && Math.floor(starAvg) > 0 ? (
                            <Rate disabled style={{ fontSize: 14 }} className="d-flex p-12" value={Math.floor(starAvg)} />
                        ) : (
                            <Rate disabled style={{ fontSize: 14 }} className="d-flex p-12" value={0} />
                        )}

                        <p className="t-color-gray font-weight-500">{typeof rateTotals === 'undefined' ? 0 : rateTotals} nhận xét</p>
                    </div>
                    {/* chi tiết */}
                    <div className=" d-flex  flex-column p-lr-16">
                        {rates.map((item, index) => (
                            <div key={index} className="d-flex justify-content-between">
                                <Rate disabled defaultValue={item} className="d-flex m-l-8" style={{ fontSize: 14, flexBasis: 100 }} />
                                {positiveStar && <Progress percent={(numberStart(item) / positiveStar?.length) * 100} type="line" showInfo={false} style={{ width: 172 }} className="m-l-8" />}
                                <span className="m-l-8">{numberStart(item)}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </Col>
            {isAuth ? (
                <form className="comment__form-group d-flex flex-wrap flex-row  mt-4" onSubmit={commentHandler}>
                    <div className="comment__form-container w-100 p-4 d-flex flex-row ">
                        <div className="comment__form">
                            <textarea
                                rows={5}
                                // type="text"
                                value={reviewMsg}
                                placeholder="Xin mời để lại câu hỏi, TTB Store sẽ trả lời lại trong 1h, các câu hỏi sau 22h - 8h sẽ được trả lời vào sáng hôm sau"
                                onChange={(e) => setReviewMsg(e.target.value)}
                                required
                            />
                        </div>
                        <Rate
                            onChange={(value) => {
                                setRactingValue(value)
                            }}
                            value={ractingValue}
                            className="d-flex m-1"
                        />
                        <button type="submit" className="btn btn-primary btn_comment">
                            <i className="ri-send-plane-fill"></i>
                            Gửi
                        </button>
                    </div>
                    <div className="comment__review w-100 p-4">
                        {data?.commentUser !== undefined ? (
                            data?.commentUser.map((item: CommentUserState, index: number) => (
                                <div key={index} className="d-flex flex-column">
                                    <div className="comment__user-wrap d-flex">
                                        <div className="comment__user review d-flex">
                                            <img src={item.imgUser} className="comment__user-img rounded-circle" />
                                            <p className="comment__user-name m-l-8 m-b-4">{item.nameUser}</p>
                                            <p className="comment__feedback-date m-b-4">{setDate(item.date.seconds)}</p>
                                        </div>
                                    </div>
                                    <Rate style={{ fontSize: 14 }} value={item.userRacting} disabled className="d-flex m-l-32 m-b-8" />
                                    <p className="comment__feedback-text p-4x">{item.commentTitle}</p>
                                </div>
                            ))
                        ) : (
                            <>Chưa có câu hỏi, nhận xết nào</>
                        )}
                    </div>
                </form>
            ) : (
                <Link to={'/login'}>
                    <h3 className="text-center mt-5 t-color-secondary">Đăng nhập để nhận xét</h3>
                </Link>
            )}
        </div>
    )
}

export default Comment
