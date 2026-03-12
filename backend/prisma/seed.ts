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
    const employees = [
      { name: "Toriq Abdul Rosyid", department: "IT", position: "Junior Fullstack Developer" },
      { name: "Siti Rahma", department: "HR", position: "HR Manager" },
      { name: "M.Hasbianur", department: "Finance", position: "Accountant" },
      { name: "Achyar Bagus", department: "Operations", position: "Warehouse Supervisor" },
      { name: "Anisa Meilani", department: "Marketing", position: "Social Media Specialist" }
    ]

    for (const emp of employees) {
      const existing = await prisma.employee.findFirst({
        where: { name: emp.name }
      })

      if (!existing) {
        await prisma.employee.create({ data: emp })
      }
    }

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
