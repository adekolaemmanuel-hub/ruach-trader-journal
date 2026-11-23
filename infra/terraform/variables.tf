variable "aws_region" {
  description = "AWS region to deploy into"
  type        = string
  default     = "us-east-1"
}

variable "project" {
  description = "Project name, used in resource names and tags"
  type        = string
  default     = "ruach-reliability-lab"
}

variable "environment" {
  description = "Environment label for tagging"
  type        = string
  default     = "lab"
}

variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "my_ip" {
  description = "Your public IP (no /32), allowed to SSH and reach the k3s API"
  type        = string
}

variable "key_name" {
  description = "Name of an existing EC2 key pair for SSH"
  type        = string
}
