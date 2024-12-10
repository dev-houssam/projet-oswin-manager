SELECT apps.*
FROM apps
JOIN user_installed_apps ON user_installed_apps.app_id = apps.id
WHERE user_installed_apps.user_id = 22;
