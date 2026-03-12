<x-mail::message>
# Reporte Diario de Documentación de Vehículos

Este es un aviso automático generado por el sistema **App Security Wasion** para informarle sobre vehículos que requieren atención inmediata en su documentación.

<x-mail::panel>
A continuación se listan los colaboradores cuyos documentos (Licencia o Seguro) están **Vencidos** o vencerán en los próximos **7 días**.
</x-mail::panel>

<x-mail::table>
| Colaborador | Marbete | Documento | Fecha de Vencimiento | Planta |
| :--- | :--- | :--- | :--- | :--- |
@foreach($vehicles as $vehicle)
| **{{ $vehicle['name'] }}** | {{ $vehicle['marbete'] }} | {{ $vehicle['doc_type'] }} | <span style="color: {{ $vehicle['is_expired'] ? '#e11d48' : '#d97706' }}">{{ $vehicle['expiry_date']->format('d/m/Y') }}</span> | {{ $vehicle['plant'] }} |
@endforeach
</x-mail::table>

<x-mail::button :url="config('app.url') . '/admin/employee-vehicles'">
Ver Detalles en Panel Admin
</x-mail::button>

Favor de coordinar con los colaboradores correspondientes para la actualización de sus registros.

Atentamente,<br>
**Sistema de Seguridad Wasion**
</x-mail::message>
