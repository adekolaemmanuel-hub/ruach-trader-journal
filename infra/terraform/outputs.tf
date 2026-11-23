output "control_plane_public_ip" {
  description = "Public IP of the k3s control plane"
  value       = module.compute.control_plane_public_ip
}

output "worker_public_ips" {
  description = "Public IPs of the k3s workers"
  value       = module.compute.worker_public_ips
}

output "control_plane_private_ip" {
  description = "Private IP of the control plane (workers join using this one)"
  value       = module.compute.control_plane_private_ip
}

output "worker_private_ips" {
  description = "Private IPs of the k3s workers"
  value       = module.compute.worker_private_ips
}
