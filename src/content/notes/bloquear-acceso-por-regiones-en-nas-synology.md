---
title: "Bloquear el acceso por regiones en un NAS Synology"
description: "Cómo configurar el cortafuegos de Synology DSM para limitar el acceso externo por país y mantener el acceso desde la red local."
pubDate: 2023-06-24
updatedDate: 2026-10-30
tags:
  - Synology
  - NAS
  - Seguridad
  - Redes
---

En 2023 empecé a recibir avisos de intentos de inicio de sesión desde direcciones IP de distintos países, aunque normalmente accedía a mi NAS desde España. Una forma de reducir la superficie de exposición es utilizar el cortafuegos de DSM para permitir el acceso desde las ubicaciones que necesitamos y denegar el resto.

La interfaz y los nombres de algunas opciones pueden variar ligeramente según la versión de DSM y el modelo. Esta guía se ha revisado tomando como referencia la documentación oficial de Synology para DSM 7.

> **Antes de empezar:** configura las reglas desde un equipo conectado a la red local y asegúrate de conocer la subred de tu casa. Una regla incorrecta puede dejarte fuera del NAS. El filtrado geográfico tampoco sustituye a contraseñas robustas, la autenticación multifactor ni a mantener DSM actualizado.

## 1. Activar el cortafuegos

1. Entra en DSM con una cuenta administradora.
2. Abre **Panel de control → Seguridad → Cortafuegos**.
3. Activa **Habilitar cortafuegos** si todavía no está activo.
4. En **Perfil de cortafuegos**, selecciona el perfil que quieras utilizar. Puedes crear uno nuevo para probar la configuración sin modificar otro perfil que ya uses.

## 2. Permitir primero la red local

Antes de restringir el acceso por países, crea una regla que permita el acceso desde tu red doméstica:

1. En el perfil elegido, pulsa **Editar reglas** y después **Crear**.
2. En **Puertos**, selecciona **Todos** si quieres permitir todos los servicios desde la LAN.
3. En **IP de origen**, selecciona **IP específica**.
4. Introduce la subred local que corresponda a tu red. Por ejemplo, si tu red es `192.168.1.0/24`, utiliza ese rango; no copies este ejemplo si tu router utiliza otra subred.
5. En **Acción**, selecciona **Permitir**.

Coloca esta regla por encima de las reglas de bloqueo. Si administras el NAS desde otra red de confianza, añade también su IP o rango específico.

## 3. Permitir el acceso desde las ubicaciones necesarias

Crea otra regla para permitir las ubicaciones desde las que realmente necesitas conectarte:

1. Pulsa **Crear**.
2. En **Puertos**, selecciona los servicios concretos que necesites. Puedes elegir **Todos** si esa es tu política, aunque limitar los puertos expuestos es preferible.
3. En **IP de origen**, selecciona **Ubicación** y pulsa **Seleccionar**.
4. Elige España (o los países desde los que necesites acceder).
5. En **Acción**, selecciona **Permitir**.

La opción de ubicación utiliza información GeoIP. No es una identificación infalible: algunas direcciones pueden estar clasificadas en otro país o no estar actualizadas.

## 4. Denegar el resto del tráfico

Si quieres aplicar una lista permitida —solo red local y ubicaciones autorizadas— añade una última regla:

1. En **Puertos**, selecciona **Todos**.
2. En **IP de origen**, selecciona **Todos**.
3. En **Acción**, selecciona **Denegar**.
4. Sitúa esta regla **debajo** de las reglas que permiten la LAN y las ubicaciones autorizadas.

El orden es fundamental: DSM aplica la primera regla coincidente y deja de evaluar las siguientes. Revisa también la acción predeterminada de la interfaz; puedes utilizar **Denegar acceso** para el tráfico que no coincida con ninguna regla, siempre que hayas comprobado antes todas las excepciones necesarias.

## 5. Comprobar la configuración

Antes de cerrar la sesión:

- Comprueba que puedes seguir entrando desde un equipo de la red local.
- Verifica desde una conexión externa autorizada que los servicios necesarios siguen accesibles.
- Si utilizas acceso remoto, VPN, proxy inverso o aplicaciones que dependan de puertos concretos, revisa sus necesidades antes de aplicar una regla general.
- Mantén una vía de acceso local para poder corregir el perfil si algo deja de funcionar.

Si una dirección de un país bloqueado sigue llegando al NAS, puede deberse a que su IP esté mal geolocalizada o haya cambiado de rango. Synology explica cómo revisar las direcciones asociadas a una ubicación en su [guía de diagnóstico](https://kb.synology.com/en-me/DSM/tutorial/I_allowblock_with_regioncountry_IP_but_some_IP_from_that_regioncountry_still_can_access_the_NAS).

## Consideraciones de seguridad

El bloqueo por países reduce parte del tráfico no deseado, pero no convierte el NAS en inaccesible desde el exterior ni evita todos los intentos. Si no necesitas publicar servicios en Internet, lo más seguro es no exponerlos y conectarte mediante una VPN. Si necesitas acceso remoto, limita los puertos y servicios, utiliza contraseñas únicas y activa la autenticación en dos pasos.

Consulta la documentación oficial para ver las opciones exactas de tu versión:

- [Cortafuegos de DSM — Synology Knowledge Center](https://kb.synology.com/index.php/es-mx/DSM/help/DSM/AdminCenter/connection_security_firewall?version=7)
- [Cómo configurar el cortafuegos en DSM](https://kb.synology.com/en-ca/DSM/tutorial/How_do_I_configure_firewall_in_DSM)
