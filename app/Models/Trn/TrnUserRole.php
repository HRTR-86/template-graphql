<?php declare(strict_types=1);

namespace App\Models\Trn;

use App\Models\BaseModel;
use App\Models\Mst\MstRole;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class TrnUserRole extends BaseModel
{
    use HasFactory, SoftDeletes;

    protected $table = 'trn_user_role';

    protected $fillable = [
        'user_id',
        'role_id',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'is_current' => 'boolean',
    ];

    /**
     * @return BelongsTo
     */
    public function mstRole(): BelongsTo
    {
        return $this->belongsTo(MstRole::class, 'role_id', 'id');
    }
}
