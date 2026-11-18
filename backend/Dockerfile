FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline -B

COPY src ./src
RUN mvn package -DskipTests -B && mvn dependency:copy-dependencies -DincludeScope=runtime -DoutputDirectory=target/dependency -B

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

COPY --from=build /app/target/*.jar ./app.jar
COPY --from=build /app/target/dependency ./dependency

ENV PORT=80
EXPOSE 80

CMD ["java", "-cp", "app.jar:dependency/*", "br.com.fiap.planeat.Main"]
