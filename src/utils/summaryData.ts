import React from "react"
import {
  UserOutlined,
  ClockCircleOutlined,
  HomeOutlined,
  FileOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons"
import type { SummaryCardData } from "../types"

export const summaryCards: SummaryCardData[] = [
  {
    title: "New Patients",
    value: 20,
    icon: UserOutlined,
  },
  {
    title: "Average Wait Time",
    value: "25 min",
    icon: ClockCircleOutlined,
    tooltip: "Average time patients spend in the queue",
  },
  {
    title: "Patients in Queue",
    value: 10,
    icon: HomeOutlined,
  },
  {
    title: "Queue No.",
    value: "11-20",
    icon: null,
  },
  {
    title: "Cancellations",
    value: 2,
    icon: FileOutlined,
  },
  {
    title: "Urgent Cases",
    value: 10,
    icon: ExclamationCircleOutlined,
    additionalInfo: "4,7,12",
  },
]

