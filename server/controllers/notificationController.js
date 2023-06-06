import { Notification } from "../models/Notification.js"
import { companyIdFromUserType } from "../utils/companyIdfromUserType.js"

export const getAllNotifications = async (req, res, next) => {
  try {
    const companyId = await companyIdFromUserType(req.userId, req.userType)
    const notifications = await Notification.find({ company: companyId }).sort({
      createdAt: "desc",
    })
    res.status(200).json(notifications)
  } catch (error) {
    next(error)
  }
}

export const getMessageNotifications = async (req, res, next) => {
  try {
    const companyId = await companyIdFromUserType(req.userId, req.userType)
    const messageNotifications = await Notification.find({
      company: companyId,
      NotificationType: "message",
    })
    res.status(200).json(messageNotifications)
  } catch (error) {
    next(error)
  }
}

export const deleteAllNotifications = async (req, res, next) => {
  try {
    const companyId = await companyIdFromUserType(req.userId, req.userType)
    await Notification.deleteMany({ company: companyId })
    res.status(200).json("deleted")
  } catch (error) {
    next(error)
  }
}

export const deleteNotification = async (req, res, next) => {
  const { notificationId } = req.params
  try {
    await Notification.findByIdAndDelete(notificationId)
    res.status(200).json("deleted")
  } catch (error) {
    next(error)
  }
}
