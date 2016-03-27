# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Partner.delete_all
Task.delete_all

partner_ids = []

5.times do
  name = Faker::Company.name
  note = Faker::Lorem.sentence(2, true, 4)

  statusRandom = rand(0..1)
  relationship_status = 0
  if statusRandom > 0.6
    relationship_status = 2
  elsif statusRandom > 0.3
    relationship_status = 1
  end

  Partner.create!(
    name: name,
    note: note,
    relationship_status: relationship_status,
    is_deleted: false
  )

  partner_ids.push(Partner.last.id)
end

10.times do
  title = Faker::Lorem.sentence(3, false, 4)
  description = Faker::Lorem.paragraph(2, true, 4)
  deadline = Faker::Date.between(5.days.ago, Date.today)
  catRandom = rand(0..1)
  category = catRandom < 0.5 ? 0 : 1

  statusRandom = rand(0..1)
  status = 0
  if statusRandom > 0.6
    status = 2
  elsif statusRandom > 0.3
    status = 1
  end

  partnerId = partner_ids[rand(0..4)]

  Task.create!(
    title: title,
    description: description,
    deadline: deadline,
    category: category,
    status: status,
    partner_id: partnerId
  )
end
