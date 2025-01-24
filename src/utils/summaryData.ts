import {
  UserOutlined,
  ClockCircleOutlined,
  InfoCircleOutlined,
  DisconnectOutlined ,
  AimOutlined ,
  BorderBottomOutlined
} from "@ant-design/icons"
import type { SummaryCardData } from "../types"

export const summaryCards: SummaryCardData[] = [
  {
    title1: "New Patients",
    value1: 20,
    icon1: UserOutlined,
  },
  {
    title1: "Average Wait Time",
    value1: "25 min",
    icon1: ClockCircleOutlined,
    tooltip: "Average time patients spend in the queue",
    icon2: InfoCircleOutlined,
    additionalInfo: "Average waiting time is 25 minutes",
  },
  {
    title1: "Patients in Queue",
    value1: 10,
    icon1: BorderBottomOutlined,
    title2: "Queue No.",
    value2: "11-20",
  },
  {
    title1: "Cancellations",
    value1: 2,
    icon1: DisconnectOutlined,
  },
  {
    title1: "Urgent Cases",
    value1: 10,
    icon1: AimOutlined,
    title2: "Queue No.",
    value2: "4,7,2",
  },
]

