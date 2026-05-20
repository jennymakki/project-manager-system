# Project Manager API

A backend REST API built with Spring Boot for managing projects, boards, tasks, and users.

This project is built using Test-Driven Development (TDD) and follows a layered architecture with domain-driven package structure.

---

## Features (MVP)

- User registration and authentication
- JWT-based authentication
- Boards (project containers)
- Lists within boards
- Tasks within lists
- Full CRUD for all entities

---

## Planned Features

- Task assignment to users
- Due dates and status management (TODO, IN_PROGRESS, DONE)
- Comments on tasks
- Pagination and filtering
- Search functionality

---

## Architecture

The project follows a feature-based layered structure:

- Controller → API layer
- Service → Business logic
- Repository → Database access
- Entity → Domain models
- DTO → API contracts

---

## Testing Strategy

The project is built using TDD:

- Unit tests for services
- Integration tests for controllers
- Repository tests for database layer

Each feature is developed in a Red → Green → Refactor cycle.

---

## Tech Stack

- Java 25
- Spring Boot
- Spring Security + JWT
- Spring Data JPA
- PostgreSQL (dev) / H2
- Maven
- Docker

---

## Getting Started

```bash
# run the project
mvn spring-boot:run