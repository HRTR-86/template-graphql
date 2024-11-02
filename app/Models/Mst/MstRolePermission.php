<?php declare(strict_types=1);

namespace App\Models\Mst;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MstRolePermission extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'mst_role_permission';

    protected $fillable = [
        'role_id',
        'permission_id',
        'created_by',
        'updated_by',
    ];
}
