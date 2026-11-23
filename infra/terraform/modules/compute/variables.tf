variable "project" {
  description = "Project name used in resource names"
  type        = string
}

variable "ami" {
  description = "AMI ID for all nodes"
  type        = string
}

variable "key_name" {
  description = "EC2 key pair name for SSH"
  type        = string
}

variable "subnet_id" {
  description = "Subnet the nodes launch into"
  type        = string
}

variable "security_group_id" {
  description = "Security group attached to all nodes"
  type        = string
}

variable "instance_type" {
  description = "EC2 instance type for all nodes"
  type        = string
  default     = "t3.medium"
}

variable "worker_count" {
  description = "Number of k3s worker nodes"
  type        = number
  default     = 2
}

variable "root_volume_size" {
  description = "Root disk size in GB"
  type        = number
  default     = 30
}
