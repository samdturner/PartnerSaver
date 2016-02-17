# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Task.delete_all

10.times do
  title = Faker::Lorem.sentence(3, false, 4)
  description = Faker::Lorem.paragraph(2, true, 4)
  deadline = Faker::Date.between(5.days.ago, Date.today)
  random = rand(0..1)
  task_type = random < 0.5 ? "0" : "1"
  Task.create!(title: title, description: description, deadline: deadline, task_type: task_type)
end
