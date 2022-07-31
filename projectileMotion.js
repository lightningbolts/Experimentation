const g = 9.80665
function projectile_motion_find_distance(angle, initial_velocity, initial_height) {
  let a = angle
  let v = initial_velocity
  let d = ((v ** 2) * Math.sin(2 * a) + initial_height) / g
  console.log(d)
  return "All done"
}

function projectile_motion_find_angle(distance, initial_velocity) {
  let d = distance
  let v = initial_velocity
  let s1 = (1 / 2) * Math.asin(g * d / (v ** 2))
  let s2 = (1 / 2) * Math.acos(g * d / (v ** 2))
  console.log(radians_to_degrees(s1), "Shallow")
  console.log(radians_to_degrees(s2), "Steep")
  return "All done"
}

function projectile_motion_find_velocity(angle, distance) {
  let a = angle
  let d = distance
  let v = Math.sqrt(g * d / Math.sin(2 * a))
  console.log(v)
  return "All done"
}

function make_vector(x_1, y_1) {
  return [x_1, y_1]
}

function find_height_of_apex(initial_velocity, angle, initial_height) {
  return (initial_velocity ** 2 * (Math.sin(angle)) ** 2) / (2 * g) + initial_height
}

function find_velocity_at_apex(initial_velocity, angle) {
  return (initial_velocity * Math.cos(angle))
}

function final_velocity(initial_velocity, angle, time) {
  let v_x = initial_velocity * Math.cos(angle)
  let v_y = v_x - g * time
  console.log(v_x, v_y)
  return Math.sqrt(v_x ** 2 + v_y ** 2)
}

function time_of_flight(initial_velocity, angle) {
  return (2 * initial_velocity * Math.sin(angle)) / g
}

function radians_to_degrees(radians) {
  var pi = Math.PI;
  return radians * (180 / pi);
}
function degrees_to_radians(degrees) {
  var pi = Math.PI;
  return degrees * (pi / 180);
}

function terminalv(mass, surface_area, drag_c) {
  return Math.sqrt(2 * mass * 9.81 / (drag_c * 1.225 * surface_area))
}

function projectile_motion_time(distance, initial_velocity, angle) {
  return distance / (initial_velocity * Math.cos(angle))
}

//console.log(terminalv(42, 1.57 * 0.41 * 7 / 9, 1), "m/s") //Mom's terminal velocity, belly flop
//console.log(terminalv(42, 1.57 * 0.41 * 7 / 9 * 1 / 2, 1), "m/s") //Mom's terminal velocity, standing

//console.log(radians_to_degrees(0.7853981633974483));
//console.log(projectile_motion_find_distance(degrees_to_radians(45), 40))
//console.log(projectile_motion_find_angle(200, 100))
//console.log(find_height_of_apex(400, degrees_to_radians(30), 300))
//console.log(time_of_flight(400, degrees_to_radians(30), 300))
//console.log(projectile_motion_find_distance(degrees_to_radians(30), 400, 300))
//console.log(final_velocity(400, degrees_to_radians(30), 40.788648519117125))
//console.log(projectile_motion_find_distance(degrees_to_radians(45), 500.02, 55)) // cannonball (shell) maximum projectile speed
//console.log(find_velocity_at_apex(100, degrees_to_radians(30)))
//console.log(projectile_motion_find_velocity(degrees_to_radians(5), 10000))
//console.log(projectile_motion_find_angle(500, 100))
//console.log(projectile_motion_find_distance(degrees_to_radians(45), 350, 0))
console.log(projectile_motion_time(25000, 500.02, degrees_to_radians(45)))