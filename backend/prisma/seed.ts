import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import 'dotenv/config'

async function main() {
  const connectionString = process.env.DATABASE_URL
  const pool = new Pool({ connectionString })
  const adapter = new PrismaPg(pool as any)
  const prisma = new PrismaClient({ adapter })

  try {
    await prisma.attendance.deleteMany({})
    await prisma.employee.deleteMany({})
    await prisma.employee.createMany({
      data: [
        { name: "Toriq Abdul Rosyid", department: "IT", position: "Junior Fullstack Developer" },
        { name: "Siti Rahma", department: "HR", position: "HR Manager" },
        { name: "M.Hasbianur", department: "Finance", position: "Accountant" }
      ]
    })

    console.log("Seed data inserted successfully")
  } catch (err) {
    console.error("Seed failed:", err)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
    await pool.end()
  }
}

main()
